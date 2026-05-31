export const buckets = [
	{ id: 'viz', label: 'viz' },
	{ id: 'reporting', label: 'analysis & reporting' },
	{ id: 'other', label: 'other' }
];

export function typingEffect(element, text, cursor, i = 0) {
	if (i === 0) {
		element.textContent = '';
		element.appendChild(cursor);
	}
	element.textContent += text[i];
	if (i === text.length - 1) {
		cursor.style.display = 'none';
		return;
	}
	setTimeout(() => typingEffect(element, text, cursor, i + 1), 85);
}

let active = $state(null);
let showBuckets = $state(true);
let emailLabel = $state('click to copy email');

export function getEmailLabel() {
	return emailLabel;
}

export function copyEmail(e) {
	e.preventDefault();
	navigator.clipboard.writeText('amahaja@umd.edu');
	emailLabel = 'copied!';
	setTimeout(() => (emailLabel = 'click to copy email'), 2000);
}

export function toggle(bucket) {
	active = active === bucket ? null : bucket;
}

export function getActive() {
	return active;
}

export function toggleBuckets() {
	showBuckets = !showBuckets;
	if (!showBuckets) active = null;
}

export function getShowBuckets() {
	return showBuckets;
}
