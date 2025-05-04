export type Challenge = {
	id: string;
	title: string;
	description: string;
	points: number;
	completed: boolean;
	media?: string; // base64-String oder URL
};
