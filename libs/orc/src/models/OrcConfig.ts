import { OrcTask } from './OrcTask';

/**
 * Definition of `orc` configuration.
 *
 * @public
 */
export interface OrcConfig {
	scripts?: Record<string, OrcTask>;
}
