import { IAgentInfo } from '../../middlewares/set-agent/agent.interface';

declare global {
    namespace Express {
        interface Request {
            user?: any;
            agent: IAgentInfo;
            deviceSession?: any;
        }
    }
}
