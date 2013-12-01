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
        name: "Pressure gradient using mud weight, lb/ft3",
        categories: [ "Basic Formulas" ],
        args: {
            a: {
                label: "Mud Weight",
                uom: "lb/ft3",
                defaultValue: 0.0
            }
        },
        uom: "psi/ft",
        formula: function(args) {
            return args.a * 0.006944;
        },
        description: "formula: psi/ft = mud weight, lb/ft x 0.006944"
    }, {
        name: "Hydrostatic pressure using ppg and feet as the units of measure",
        categories: [ "Hydrostatic Pressure (HP)" ],
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
        categories: [ "Hydrostatic Pressure (HP)" ],
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
        name: "Hydrostatic pressure, psi, using mud weight, lb/ft3",
        categories: [ "Hydrostatic Pressure (HP)" ],
        args: {
            a: {
                label: "Mud Weight",
                uom: "lb/ft3",
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
        description: "formula: psi = mud weight, lb/ft3 x 0.006944 x TVD, ft"
    }, {
        name: "Hydrostatic pressure, psi, using meters as unit of depth",
        categories: [ "Hydrostatic Pressure (HP)" ],
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