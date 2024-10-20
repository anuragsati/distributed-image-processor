import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { ProdStage, StagingStage } from "./pipeline-stage";
import { Account, Stage } from "../../constants/config";
import { pipelineEnvironments } from "./pipeline-config";

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        /**
         * TODO : we shoule create our pipeline for the given branch and repository,
         * DIPPipeline-PROD : pipeline should have all stages, triggered through main branch
         * DIPPipeline-STAGE : pipeline should have only dev/stage stage, triggered through stage/dev branch
         */

        // ====================================== MAIN Pipeline ======================================
        const pipeline = new CodePipeline(this, "DIPPipelineMain", {
            pipelineName: "DIPPipeline-main",
            synth: new ShellStep("Synth", {
                input: CodePipelineSource.gitHub("anuragsati/distributed-image-processor", "main"),
                commands: ["cd infra", "npm ci", "npm run build", "npx cdk synth"],
                primaryOutputDirectory: "infra/cdk.out",
            }),
            crossAccountKeys: true,
            selfMutation: true,
        });

        new StagingStage(this, Stage.STAGE);
        const prodStage: ProdStage = new ProdStage(this, Stage.PROD);
    }
}
