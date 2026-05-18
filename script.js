import routineData from './routine.json' with { type: 'json' };

const inputField = document.getElementById('course-input');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');
const suggestionsBox = document.getElementById('search-suggestions');

const normalize = (str) => str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

const handleSearch = () => {
    const query = inputField.value.trim();
    if (!query) {
        resultsContainer.innerHTML = '<div class="no-results">Please enter at least one course code or title to search.</div>';
        return;
    }

    const parts = query.split(',').map(p => p.trim()).filter(p => p.length >= 2);
    if (parts.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">Please enter at least 2 characters to search.</div>';
        return;
    }

    let allResults = [];
    parts.forEach(part => {
        const nq = normalize(part);
        const matches = routineData.filter(item =>
            normalize(item.code).includes(nq) || normalize(item.title).includes(nq)
        );
        allResults = allResults.concat(matches);
    });

    // Deduplicate by code
    const seen = new Set();
    const uniqueResults = allResults.filter(item => {
        if (seen.has(item.code)) return false;
        seen.add(item.code);
        return true;
    });

    uniqueResults.sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;
        return a.period.localeCompare(b.period);
    });

    // --- Conflict detection ---

    // 1. Timeslot conflict: same day AND same period
    const slotMap = {};
    uniqueResults.forEach(item => {
        const slot = `${item.day}-${item.period}`;
        if (!slotMap[slot]) slotMap[slot] = [];
        slotMap[slot].push(item);
    });
    const conflictGroups = Object.values(slotMap).filter(g => g.length > 1);

    // 2. Same day warning: multiple courses on the same day
    const dayMap = {};
    uniqueResults.forEach(item => {
        if (!dayMap[item.day]) dayMap[item.day] = [];
        dayMap[item.day].push(item);
    });
    const sameDayGroups = Object.values(dayMap).filter(g => g.length > 1);

    // 3. Prerequisite conflict: a course and its prerequisite both selected
    const selectedCodes = new Set(uniqueResults.map(item => item.code));
    const prereqConflicts = [];
    uniqueResults.forEach(item => {
        if (item.prerequisite && item.prerequisite.length > 0) {
            item.prerequisite.forEach(prereq => {
                if (selectedCodes.has(prereq)) {
                    prereqConflicts.push({ course: item, prereq });
                }
            });
        }
    });

    displayResults(uniqueResults, conflictGroups, sameDayGroups, prereqConflicts);
    suggestionsBox.classList.add('hidden');
};

const displayResults = (results, conflictGroups, sameDayGroups, prereqConflicts) => {
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No exams found for the given search.</div>';
        return;
    }

    // Prerequisite conflict errors
    if (prereqConflicts.length > 0) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-error';
        errorDiv.innerHTML = '<span class="alert-icon">✕</span><div><strong>Prerequisite Conflict</strong><ul>' +
            prereqConflicts.map(c =>
                `<li><strong>${c.course.code}</strong> requires <strong>${c.prereq}</strong> as a prerequisite - you cannot take both in the same semester.</li>`
            ).join('') + '</ul></div>';
        resultsContainer.appendChild(errorDiv);
    }

    // Timeslot conflict errors
    if (conflictGroups.length > 0) {
        const conflictDiv = document.createElement('div');
        conflictDiv.className = 'alert alert-error';
        conflictDiv.innerHTML = '<span class="alert-icon">✕</span><div><strong>Time Slot Conflict</strong><ul>' +
            conflictGroups.map(g =>
                `<li>Day ${g[0].day}, Slot ${g[0].period} (${g[0].time || 'TBA'}): ${g.map(c => `<strong>${c.code}</strong>`).join(' & ')} overlap.</li>`
            ).join('') + '</ul></div>';
        resultsContainer.appendChild(conflictDiv);
    }

    // Same-day warnings
    if (sameDayGroups.length > 0) {
        const warnDiv = document.createElement('div');
        warnDiv.className = 'alert alert-warning';
        warnDiv.innerHTML = '<span class="alert-icon">⚠</span><div><strong>Same Day Warning</strong><ul>' +
            sameDayGroups.map(g =>
                `<li>Day ${g[0].day}: ${g.map(c => `<strong>${c.code}</strong>`).join(', ')} are all scheduled on the same exam day.</li>`
            ).join('') + '</ul></div>';
        resultsContainer.appendChild(warnDiv);
    }

    // Build sets for card highlighting
    const conflictCodes = new Set();
    conflictGroups.forEach(g => g.forEach(item => conflictCodes.add(item.code)));

    const prereqCodes = new Set();
    prereqConflicts.forEach(c => { prereqCodes.add(c.course.code); prereqCodes.add(c.prereq); });

    const sameDayCodes = new Set();
    sameDayGroups.forEach(g => g.forEach(item => sameDayCodes.add(item.code)));

    results.forEach((item, index) => {
        const isEven = item.day % 2 === 0;
        let cardClass = isEven ? 'result-card glass-panel day-even' : 'result-card glass-panel';

        if (conflictCodes.has(item.code) || prereqCodes.has(item.code)) {
            cardClass += ' card-conflict';
        } else if (sameDayCodes.has(item.code)) {
            cardClass += ' card-warning';
        }

        const card = document.createElement('div');
        card.className = cardClass;
        card.style.animationDelay = `${index * 0.1}s`;

        const timeDisplay = item.time || 'TBA';
        const prereqList = item.prerequisite && item.prerequisite.length > 0
            ? `<div class="prereq-info">Prerequisites: ${item.prerequisite.join(', ')}</div>`
            : '';

        card.innerHTML = `
            <div class="result-info">
                <div class="course-code-badge">${item.code}</div>
                <h3 class="course-title">${item.title}</h3>
                ${prereqList}
            </div>
            <div class="time-info">
                <div class="day-badge">Day ${item.day}</div>
                <div class="time-slot">${timeDisplay}</div>
                <div class="period">Slot ${item.period}</div>
            </div>
        `;

        resultsContainer.appendChild(card);
    });
};

searchBtn.addEventListener('click', handleSearch);

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Autocomplete suggestions - search by code or title
inputField.addEventListener('input', () => {
    const value = inputField.value;
    const parts = value.split(',');
    const lastPart = parts[parts.length - 1].trim();

    if (lastPart.length < 2) {
        suggestionsBox.classList.add('hidden');
        return;
    }

    const nq = normalize(lastPart);
    const matches = routineData
        .filter(item => normalize(item.code).includes(nq) || normalize(item.title).includes(nq))
        .slice(0, 6);

    if (matches.length === 0) {
        suggestionsBox.classList.add('hidden');
        return;
    }

    suggestionsBox.innerHTML = '';
    matches.forEach(match => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `<span class="suggestion-code">${match.code}</span><span class="suggestion-title">${match.title}</span>`;
        div.addEventListener('click', () => {
            parts[parts.length - 1] = ' ' + match.code;
            inputField.value = parts.join(',').trim() + ', ';
            inputField.focus();
            suggestionsBox.classList.add('hidden');
        });
        suggestionsBox.appendChild(div);
    });
    suggestionsBox.classList.remove('hidden');
});

// Modal Logic
const modal = document.getElementById('courses-modal');
const btn = document.getElementById('all-courses-btn');
const span = document.getElementById('close-modal');
const allCoursesList = document.getElementById('all-courses-list');

btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    renderAllCourses();
});

span.addEventListener('click', () => modal.classList.add('hidden'));

window.addEventListener('click', (event) => {
    if (event.target === modal) modal.classList.add('hidden');
    if (typeof contactModal !== 'undefined' && event.target === contactModal) {
        contactModal.classList.add('hidden');
    }
    if (event.target !== inputField && !suggestionsBox.contains(event.target)) {
        suggestionsBox.classList.add('hidden');
    }
});

const renderAllCourses = () => {
    allCoursesList.innerHTML = '';
    
    const uniqueMap = new Map();
    routineData.forEach(item => {
        if (!uniqueMap.has(item.code)) {
            uniqueMap.set(item.code, item);
        }
    });
    
    const sorted = Array.from(uniqueMap.values()).sort((a, b) => a.code.localeCompare(b.code));
    
    sorted.forEach((item, index) => {
        const courseEl = document.createElement('div');
        courseEl.className = 'course-list-item';
        courseEl.innerHTML = `<span class="course-code-badge">${item.code}</span> <span class="course-list-title">${item.title}</span>`;
        courseEl.style.animationDelay = `${(index % 10) * 0.05}s`;
        courseEl.style.cursor = 'pointer';
        
        courseEl.addEventListener('click', () => {
            const currentValue = inputField.value.trim();
            if (currentValue) {
                const parts = currentValue.split(',').map(p => p.trim()).filter(p => p.length > 0);
                if (!parts.includes(item.code)) {
                    parts.push(item.code);
                    inputField.value = parts.join(', ') + ', ';
                }
            } else {
                inputField.value = item.code + ', ';
            }
            handleSearch();
            modal.classList.add('hidden');
        });
        
        allCoursesList.appendChild(courseEl);
    });
};

// Contact Modal Logic
const contactModal = document.getElementById('contact-modal');
const contactBtn = document.getElementById('contact-btn');
const closeContactSpan = document.getElementById('close-contact-modal');

if (contactBtn) {
    contactBtn.addEventListener('click', () => contactModal.classList.remove('hidden'));
}
if (closeContactSpan) {
    closeContactSpan.addEventListener('click', () => contactModal.classList.add('hidden'));
}

// Refresh & Wave Logic
const refreshBtn = document.getElementById('refresh-btn');
const waveContainer = document.getElementById('wave-container');

if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
        inputField.value = '';
        resultsContainer.innerHTML = '';
        suggestionsBox.classList.add('hidden');

        refreshBtn.classList.add('refresh-btn-clicked');
        setTimeout(() => refreshBtn.classList.remove('refresh-btn-clicked'), 800);

        const rect = refreshBtn.getBoundingClientRect();
        const x = e.clientX || (rect.left + rect.width / 2);
        const y = e.clientY || (rect.top + rect.height / 2);

        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        waveContainer.appendChild(wave);
        setTimeout(() => wave.remove(), 1400);
    });
}
