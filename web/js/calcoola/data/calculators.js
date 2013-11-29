define([], function() {
    return [{
        name: "Pressure Gradient using mud weight, ppg",
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
        }
    }, {
        name: "Pressure Gradient using mud weight, lb/ft3",
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
        }
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