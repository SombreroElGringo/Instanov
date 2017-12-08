const loggerMiddleware = store => next => action => {
	console.log(action.type);
	action.err && console.error(action.err);
	next(action)
};

export default loggerMiddleware