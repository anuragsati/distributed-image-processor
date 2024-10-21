import * as cdk from "aws-cdk-lib";

import { Construct } from "constructs";
import { EnvironmentConfig, Region, Stage } from "../../../constants/config";
import { pipelineEnvironments } from "../pipeline-config";

/**
 * Ideally stacks in all evironments should be same i.e. dev/test should be similar to prod
 * Incase we want to exclude some stack in a particular stage, use if/else checks
 * OR you can even have separate stage file for each environment
 */

export class StagingStage extends cdk.Stage {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.stageApSouth1Stacks(pipelineEnvironments[Stage.STAGE][Region.AP_SOUTH_1]);
        this.stageEuWest1Stacks(pipelineEnvironments[Stage.STAGE][Region.EU_WEST_1]);
    }

    private stageApSouth1Stacks(envConfig: EnvironmentConfig): void {
        // new VpcStack(this, "VpcStackId", props);
        // new ApiGatewayStack(this, "ApiGatewayStackId", envConfig);
    }

    private stageEuWest1Stacks(envConfig: EnvironmentConfig): void {}
}
