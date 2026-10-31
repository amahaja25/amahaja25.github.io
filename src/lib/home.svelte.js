export const buckets = [
	{ id: 'viz', label: 'viz' },
	{ id: 'reporting', label: 'analysis & reporting' }
];

let active = $state(null);
let showBuckets = $state(true);
let emailLabel = $state('click to  copy my email');

export function getEmailLabel() {
	return emailLabel;
}

export function copyEmail(e) {
	e.preventDefault();
	navigator.clipboard.writeText('apurva.mahajan@texastribune.org');
	emailLabel = 'copied!';
	setTimeout(() => (emailLabel = 'click to copy my email'), 2000);
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
