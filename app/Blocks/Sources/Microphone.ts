import Grid = require("../../Grid");
import BlocksSketch = require("../../BlocksSketch");
import Source = require("../Source");

class Microphone extends Source {

    Source: Tone.Microphone;

    Init(sketch?: Fayde.Drawing.SketchContext): void {

        this.Source = new Tone.Microphone();

        super.Init(sketch);

        this.Source.start();
        this.Source.connect(this.EffectsChainInput);

        // Define Outline for HitTest
        this.Outline.push(new Point(-1, 0),new Point(0, -1),new Point(1, -1),new Point(2, 0),new Point(1, 1),new Point(0, 1));
    }

    MouseDown() {
        super.MouseDown();
    }

    MouseUp() {
        super.MouseUp();
    }

    TriggerAttack(){
        super.TriggerAttack();
    }

    TriggerRelease(){
        super.TriggerRelease();
    }

    TriggerAttackRelease(){

    }

    Update() {
        super.Update();
    }

    Draw() {
        super.Draw();
        (<BlocksSketch>this.Sketch).BlockSprites.Draw(this.Position,true,"microphone");
    }

    Dispose() {
        super.Dispose();
        this.Source.dispose();
    }
}

export = Microphone;