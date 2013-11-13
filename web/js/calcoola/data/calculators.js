define([], function() {
    return [{
        name: "Increase Mud Density",
        categories: [ "Drilling Fluids" ],
        args: {
            a: {
                label: "Starting Density",
                uom: "ppg"
            },
            b: {
                label: "Desirable Density",
                uom: "ppg"
            }
        },
        formula: function(args) {
            return (1470 * (args.b - args.a))/(35 - args.b);
        }
    }];
});