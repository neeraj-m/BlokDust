import Effect = require("../Effect");
import Grid = require("../../Grid");
import BlocksSketch = require("../../BlocksSketch");

class AutoWah extends Effect {

    public Effect: Tone.AutoWah;

    Init(sketch?: Fayde.Drawing.SketchContext): void {

        this.Effect = new Tone.AutoWah({
            "baseFrequency": 100,
            "octaves": 5,
            "sensitivity": -40,
            "gain" : 35,
            "rolloff" : -48,

            "follower" : {
                "attack": 0.2,
                "release": 1
            }
        });
        this.Effect.sensitivity = -40;
        this.Effect.octaves = 5;
        this.Effect.baseFrequency = 100;
        this.Effect.wet.value = 0.6;

        super.Init(sketch);

        // Define Outline for HitTest
        this.Outline.push(new Point(0, -1),new Point(1, -1),new Point(1, 1),new Point(-2, 1));
    }

    Draw() {
        super.Draw();
        (<BlocksSketch>this.Sketch).BlockSprites.Draw(this.Position,true,"autowah");
    }

    Dispose() {
        this.Effect.dispose();
    }

    SetParam(param: string,value: number) {
        super.SetParam(param,value);
        var jsonVariable = {};
        jsonVariable[param] = value;

        if (param=="dryWet") {
            this.Effect.wet.value = value;
        } else if (param=="octaves") {
            this.Effect.octaves = value;
        } else if (param=="baseFrequency") {
            this.Effect.baseFrequency = value;
        }
    }

    GetParam(param: string) {
        super.GetParam(param);
        var val;
        if (param=="octaves") {
            val = this.Effect.octaves;
        } else if (param=="baseFrequency") {
            val = this.Effect.baseFrequency;
        } else if (param=="dryWet") {
            val = this.Effect.wet.value;
        }

        return val;
    }

    OpenParams() {
        super.OpenParams();

        this.ParamJson =
        {
            "name" : "Auto Wah",
            "parameters" : [

                {
                    "type" : "slider",
                    "name" : "Range",
                    "setting" :"octaves",
                    "props" : {
                        "value" : this.GetParam("octaves"),
                        "min" : 1,
                        "max" : 8,
                        "quantised" : false,
                        "centered" : false
                    }
                },

                {
                    "type" : "slider",
                    "name" : "Frequency",
                    "setting" :"baseFrequency",
                    "props" : {
                        "value" : this.GetParam("baseFrequency"),
                        "min" : 50,
                        "max" : 1200,
                        "quantised" : true,
                        "centered" : false
                    }
                },

                {
                    "type" : "slider",
                    "name" : "Mix",
                    "setting" :"dryWet",
                    "props" : {
                        "value" : this.GetParam("dryWet"),
                        "min" : 0,
                        "max" : 1,
                        "quantised" : false,
                        "centered" : false
                    }
                }
            ]
        };
    }
}

export = AutoWah;