import ACTION_TYPES from './actionTypes';
import { dispatch } from './dispatcher';

function queueDialog (dialogData) {
	dispatch({
		actionType: ACTION_TYPES.QUEUE_DIALOG,
		data: {
			dialogData
		}
	});
}

function dismissDialog (id) {
	dispatch({
		actionType: ACTION_TYPES.DISMISS_DIALOG,
		data: {
			id
		}
	});
}

export default {
	queueDialog,
	dismissDialog
};
