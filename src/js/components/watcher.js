const watchItems = document.querySelectorAll('[data-watcher]');
document.documentElement.classList.add('watcher');
const options = {
    threshold: 0.1,
}

const isOnce = true;

function handleIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('_watcher-view');
            if (isOnce) {
                observer.unobserve(entry.target);
            }
        } else {
            entry.target.classList.remove('_watcher-view');
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, options);


watchItems.forEach(watchItem => {
    observer.observe(watchItem);
})