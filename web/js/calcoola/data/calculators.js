define([], function() {
    return [{
        name: "Pressure gradient using mud weight, ppg",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Mud Weight",
                uom: "ppg",
                defaultValue: 0.0
            }
        },
        uom: "psi/ft",
        formula: function(args) {
            return args.a * 0.052;
        },
        description: "formula: psi/ft = mud weight, ppg x 0.052"
    }, {
        name: "Pressure gradient using mud weight, lb/ft&sup3",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Mud Weight",
                uom: "lb/ft&sup3",
                defaultValue: 0.0
            }
        },
        uom: "psi/ft",
        formula: function(args) {
            return args.a * 0.006944;
        },
        description: "formula: psi/ft = mud weight, lb/ft&sup3 x 0.006944"
    }, {
        name: "Hydrostatic pressure using ppg and feet as the units of measure",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Mud Weight",
                uom: "ppg",
                defaultValue: 0.0
            },
            b: {
                label: "True Vertical Depth",
                uom: "ft",
                defaultValue: 0
            }
        },
        uom: "psi",
        formula: function(args) {
            return args.a * 0.052 * args.b;
        },
        description: "formula: psi = mud weight, ppg x 0.052 x true vertical depth (TVD), ft"
    }, {
        name: "Hydrostatic pressure, psi, using pressure gradient, psi/ft",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Pressure Gradient",
                uom: "psi/ft",
                defaultValue: 0.0
            },
            b: {
                label: "True Vertical Depth",
                uom: "ft",
                defaultValue: 0
            }
        },
        uom: "psi",
        formula: function(args) {
            return args.a * args.b;
        },
        description: "formula: psi = pressure gradient, psi/ft x true vertical depth, ft"
    }, {
        name: "Hydrostatic pressure, psi, using mud weight, lb/ft&sup3",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Mud Weight",
                uom: "lb/ft&sup3",
                defaultValue: 0
            },
            b: {
                label: "True Vertical Depth",
                uom: "ft",
                defaultValue: 0
            }
        },
        uom: "psi",
        formula: function(args) {
            return args.a * 0.006944 * args.b;
        },
        description: "formula: psi = mud weight, lb/ft&sup3 x 0.006944 x TVD, ft"
    }, {
        name: "Hydrostatic pressure, psi, using meters as unit of depth",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Mud Weight",
                uom: "ppg",
                defaultValue: 0.0
            },
            b: {
                label: "True Vertical Depth",
                uom: "m",
                defaultValue: 0
            }
        },
        uom: "psi",
        formula: function(args) {
            return args.a * 0.052 * args.b * 3.281;
        },
        description: "formula: psi = mud weight, ppg x 0.052 x TVD, m x 3.281"
    }, {
        name: "Equivalent Circulating Density (ECD)",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Annular Pressure Loss",
                uom: "psi",
                defaultValue: 0
            },
            b: {
                label: "True Vertical Depth",
                uom: "ft",
                defaultValue: 0
            },
            c: {
                label: "Mud Weight",
                uom: "ppg",
                defaultValue: 0.0
            }
        },
        uom: "ppg",
        formula: function(args) {
            return (args.a / 0.052 / args.b) + args.c;
        },
        description: "formula: ppg = ((annular pressure loss, psi ) / 0.052 / TVD, ft) + (mud weight in use, ppg)"
    }, {
        name: "Maximum Allowable Mud Weight from Leak-off Test Data",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Leak-Off Test Pressure",
                uom: "psi",
                defaultValue: 0
            },
            b: {
                label: "Casing Shoe TVD",
                uom: "ft",
                defaultValue: 0
            },
            c: {
                label: "Mud Weight",
                uom: "ppg",
                defaultValue: 0.0
            }
        },
        uom: "ppg",
        formula: function(args) {
            return (args.a / 0.052 / args.b) + args.c;
        },
        description: "formula: ppg = (Leak-off Pressure, psi) ÷ 0.052 ÷ (Casing Shoe TVD, ft) + (mud weight, ppg)"
    }, {
        name: "Pump Out (PO) Triplex Pump, bbl/stk",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Liner Diameter",
                uom: "in",
                defaultValue: 0
            },
            b: {
                label: "Stroke Length",
                uom: "in",
                defaultValue: 0
            },
            c: {
                label: "Efficiency",
                uom: "%",
                defaultValue: 100
            }
        },
        uom: "bbl/stk",
        decimals: 5,
        formula: function(args) {
            return 0.000243 * Math.pow(args.a, 2) * args.b * (args.c/100);
        },
        description: "formula: bbl/stk = 0.000243 x (liner diameter, in.)&sup2 X (stroke length, in.)"
    }, {
        name: "Pump Out (PO) Triplex Pump, gpm",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Liner Diameter",
                uom: "in",
                defaultValue: 0
            },
            b: {
                label: "Stroke Length",
                uom: "in",
                defaultValue: 0
            },
            c: {
                label: "Strokes Per Minute",
                uom: "SPM",
                defaultValue: 0
            }
        },
        uom: "gpm",
        formula: function(args) {
            return (3 * (Math.pow(args.a, 2) * 0.7854) * args.b) * 0.00411 * args.c;
        },
        description: "formula: gpm = [3 x ((liner diameter, in.)&sup2 x 0.7854) x (stroke length, in.)] 0.00411 x (strokes per minute)"
    }, {
        name: "Pump Out (PO) Duplex Pump, bbl/stk",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Liner Diameter",
                uom: "in",
                defaultValue: 0
            },
            b: {
                label: "Stroke Length",
                uom: "in",
                defaultValue: 0
            },
            c: {
                label: "Rod Diameter",
                uom: "in",
                defaultValue: 0
            },
            d: {
                label: "Efficiency",
                uom: "%",
                defaultValue: 100
            }
        },
        uom: "bbl/stk",
        decimals: 5,
        formula: function(args) {
            return 0.000162 * args.b * (2 * Math.pow(args.a, 2) - Math.pow(args.c, 2)) * (args.d/100);
        },
        description: "formula: bbl/stk = 0.000162 x (stroke length, in.) x (2 x (liner diameter, in.)&sup2 - (rod diameter, in.)&sup2)"
    }, {
        name: "Increase Mud Density",
        categories: [ "Drilling Fluids" ],
        args: {
            a: {
                label: "Starting Density",
                uom: "ppg",
                defaultValue: 0.0
            },
            b: {
                label: "Desirable Density",
                uom: "ppg",
                defaultValue: 0.0
            }
        },
        uom: "sk/100 bbl",
        formula: function(args) {
            return (1470 * (args.b - args.a))/(35 - args.b);
        }
    }];
});