import Dispatcher from '../dispatcher';
import ACTION_TYPES from '../actionTypes';

import { MapStore } from 'flux/utils';
import { Map as map } from 'immutable';

class DialogsStore extends MapStore {

	getInitialState () {
		return map().set('dialogs', []);
	}

	reduce (state, action) {
		switch (action.actionType) {
			case ACTION_TYPES.QUEUE_DIALOG:
				return state.set('dialogs', [].concat(state.get('dialogs'), action.data.dialogData));

			case ACTION_TYPES.DISMISS_DIALOG:
				return state.set('dialogs', state.get('dialogs').filter(d => d.id !== action.data.id));

			default:
				// no-op
				break;
		}

		return state;
	}

}

export default new DialogsStore(Dispatcher);
