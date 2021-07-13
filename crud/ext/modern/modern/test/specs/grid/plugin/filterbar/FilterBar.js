topSuite("Ext.grid.plugin.filterbar.FilterBar", [
    'Ext.data.ArrayStore', 'Ext.layout.Fit',
    'Ext.grid.Grid', 'Ext.grid.plugin.Summaries',
    'Ext.MessageBox', 'Ext.grid.SummaryRow', 'Ext.app.ViewModel'
], function() {
    function isBlank(s) {
        return !s || s === '\xA0' || s === '&nbsp;';
    }

    function expectBlank(s) {
        if (!isBlank(s)) {
            expect(s).toBe('');
        }
    }

    var store, grid,
        gridEvents = {},
        colMap, plugin,
        Sale = Ext.define(null, {
            extend: 'Ext.data.Model',

            fields: [
                { name: 'id',        type: 'int' },
                { name: 'company',   type: 'string' },
                { name: 'person',    type: 'string', summary: 'count' },
                { name: 'date',      type: 'date', defaultValue: new Date(2012, 0, 1) },
                { name: 'value',     type: 'float', defaultValue: null, summary: 'sum' },
                {
                    name: 'year',
                    convert: function(v, record) {
                        var d = record.get('date');

                        return d ? d.getFullYear() : null;
                    }
                }, {
                    name: 'month',
                    convert: function(v, record) {
                        var d = record.get('date');

                        return d ? d.getMonth() : null;
                    }
                }]
        });

    function getEventHandler(type) {
        return function() {
            gridEvents = {};
            gridEvents[type] = true;
        };
    }

    function checkRowCells(index, values) {
        var rowCells = grid.getItemAt(index).cells,
            len = values.length,
            cells = [],
            html, i, cell;

        for (i = 0; i < rowCells.length; i++) {
            if (rowCells[i].isVisible()) {
                cells[cells.length] = rowCells[i];
            }
        }

        for (i = 0; i < len; i++) {
            cell = cells[i];

            cell = cell.element.down('.x-grid-group-title', true) ||
                cell.element.down('.x-body-el', true);

            html = cell.innerHTML;

            if (isBlank(values[i])) {
                expectBlank(html);
            }
            else {
                expect(html).toBe(values[i]);
            }
        }
    }

    function makeGrid(gridConfig, storeConfig, storeData) {
        store = new Ext.data.Store(Ext.merge({
            model: Sale,
            proxy: {
                type: 'memory',
                limitParam: null,
                data: storeData || [
                    {company: 'Microsoft', person: 'John', date: new Date(), value: 1},
                    {company: 'Adobe', person: 'John', date: new Date(), value: 2},
                    {company: 'Microsoft', person: 'Helen', date: new Date(), value: 3}
                ],
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        }, storeConfig));

        // Reset flag that is set when the pivot grid has processed the data and rendered
        gridEvents = {};

        grid = new Ext.grid.Grid(Ext.merge({
            title: 'Test tree grouping',
            collapsible: true,
            multiSelect: true,
            height: 400,
            width: 750,

            listeners: {
                refresh: getEventHandler('done')
            },

            store: store,

            plugins: {
                gridfilterbar: true
            },

            columns: [
                {text: 'Company', dataIndex: 'company', itemId: 'c1', filterType: { type: 'string' }},
                {text: 'Person', dataIndex: 'person', itemId: 'c2', filterType: { type: 'string' }},
                {text: 'Date', dataIndex: 'date', xtype: 'datecolumn', itemId: 'c3', filterType: { type: 'date' }},
                {text: 'Value', dataIndex: 'value', xtype: 'numbercolumn', itemId: 'c4', filterType: { type: 'number' }},
                {text: 'Year', dataIndex: 'year', itemId: 'c5'}
            ],

            renderTo: document.body
        }, gridConfig));

        setColMap();
        plugin = grid.getPlugin('gridfilterbar');
    }

    function setColMap() {
        colMap = {};

        grid.query('column').forEach(function(col) {
            colMap[col.getItemId()] = col;
        });
    }

    function destroyGrid() {
        Ext.destroy(grid, store);
        store = grid = colMap = plugin = null;
        gridEvents = {};
    }

    afterEach(destroyGrid);

    describe('filterbar', function() {
        describe('filters', function() {
            it('should add a filter on a column', function() {
                makeGrid({
                    columns: [
                        {text: 'Company', dataIndex: 'company', itemId: 'c1', filterType: { type: 'string', value: 'Adobe' } },
                        {text: 'Person', dataIndex: 'person', itemId: 'c2'},
                        {text: 'Date', dataIndex: 'date', xtype: 'datecolumn', itemId: 'c3'},
                        {text: 'Value', dataIndex: 'value', xtype: 'numbercolumn', itemId: 'c4'},
                        {text: 'Year', dataIndex: 'year', itemId: 'c5'}
                    ]
                });

                waitsFor(function() {
                    return gridEvents && gridEvents.done;
                }, 'grid to be ready');

                runs(function() {
                    expect(store.getFilters().length).toBe(1);
                    expect(store.getCount()).toBe(1);
                });

            });

            it('should recognize if the store is filtered', function() {
                makeGrid(null, {
                    filters: {
                        property: 'company',
                        value: 'Adobe',
                        operator: '='
                    }
                });

                waitsFor(function() {
                    return gridEvents && gridEvents.done;
                }, 'grid to be ready');

                runs(function() {
                    expect(plugin.getBar().down('textfield').getValue()).toBe('Adobe');
                    expect(store.getFilters().length).toBe(1);
                    expect(store.getCount()).toBe(1);
                });

            });

            it('should react when a filter is typed in', function() {
                makeGrid();

                waitsFor(function() {
                    return gridEvents && gridEvents.done;
                }, 'grid to be ready');

                runs(function() {
                    gridEvents = null;
                    plugin.getBar().down('textfield').setValue('Adobe');
                });

                waitsFor(function() {
                    return gridEvents && gridEvents.done;
                }, 'grid to be ready');

                runs(function() {
                    expect(store.getFilters().length).toBe(1);
                    expect(store.getCount()).toBe(1);
                });
            });
        });

        describe('show/hide', function() {
            it('should show the filterbar', function() {
                makeGrid();

                waitsFor(function() {
                    return gridEvents.done;
                }, 'grid to be ready');

                runs(function() {
                    grid.hideFilterBar();
                    expect(plugin.getBar().isVisible()).toBe(false);
                    grid.showFilterBar();
                    expect(plugin.getBar().isVisible()).toBe(true);
                });
            });

            it('should hide the filterbar', function() {
                makeGrid();

                waitsFor(function() {
                    return gridEvents.done;
                }, 'grid to be ready');

                runs(function() {
                    expect(plugin.getBar().isVisible()).toBe(true);
                    grid.hideFilterBar();
                    expect(plugin.getBar().isVisible()).toBe(false);
                });
            });
        });
    });


});