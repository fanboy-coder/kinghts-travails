const squareRegistry = new Map();

const chessSquare = (x,y) => {
	const xPosition = x;
	const yPosition = y;
	let predecessor;

	const KNIGHT_OFFSETS = [
		[1,2],[1,-2],[2,1],[2,-1],[-1,2],[-1,-2],[-2,1],[-2,-1]
	];

	const getPredecessor = () => predecessor;
	const setPredecessor = (newPred) =>	{
		predecessor = predecessor || newPred;
	};

	const name = () =>	`${x}, ${y}`;

	const createKnightMoves = () => {
		return KNIGHT_OFFSETS.map((offset) => newSquareFrom(offset[0], offset[1])).filter((square) => square !==undefined);
	};

	const newSquareFrom = (xOffset, yOffset) => {
		const [newX, newY] = [xPosition + xOffset, yPosition + yOffset];
		if (0 <= newX && newX < 8 && 0 <= newY && y < 8){
			return chessSquare(newX, newY);
		}
	};

	if (squareRegistry.has(name())) {
		return squareRegistry.get(name());
	} else {
		const newSquare = {name, getPredecessor,setPredecessor,createKnightMoves};
		squareRegistry.set(name(), newSquare);
		return newSquare;
	}
};

const knightsTravails = (start, finish) => {
	squareRegistry.clear();

	const origin = chessSquare (...start);
	const target = chessSquare (...finish);

	const queue = [origin];
	while (!queue.include(target)) {
		const currentSquare = queue.shift();
		const enqueueList = currentSquare.createKnightMoves();
		enqueueList.forEach((square) => square.setPredecessor(currentSquare));
		queue.push(...enqueueList);
	};

	const path = [target];
	while (!path.includes(origin)) {
		const prevSquare = path[0].getPredecessor();
		path.unshift(prevSquare);
	};

	console.log(`The shortest path was ${path.length -1} moves!`);
	console.log("The moves were:");
	path.forEach(square => console.log(square.name()));
};

export {knightsTravails};
