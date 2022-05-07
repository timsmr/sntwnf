export default function GenerateRoomNumber() {
	let r = (Math.random() + 1).toString(36).substring(6).toUpperCase();
	return r
}