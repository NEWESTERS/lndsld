import { sha1 } from 'object-hash';

function hash(item: unknown): string {
	if (typeof item === 'object') {
		return sha1(item);
	}

	return JSON.stringify(item);
}

export default hash;
