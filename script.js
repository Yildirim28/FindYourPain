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

        let localWarningsHTML = '';
        
        const itemPrereqs = prereqConflicts.filter(c => c.course.code === item.code || c.prereq === item.code);
        if (itemPrereqs.length > 0) {
            itemPrereqs.forEach(c => {
                localWarningsHTML += `<div class="card-inline-alert card-alert-error"><span class="alert-icon">✕</span> Prerequisite Conflict: ${c.course.code} requires ${c.prereq}</div>`;
            });
        }
        
        const itemTimeslotConf = conflictGroups.find(g => g.some(c => c.code === item.code));
        if (itemTimeslotConf) {
            const others = itemTimeslotConf.filter(c => c.code !== item.code).map(c => c.code).join(' & ');
            localWarningsHTML += `<div class="card-inline-alert card-alert-error"><span class="alert-icon">✕</span> Time Slot Conflict with ${others}</div>`;
        }

        const itemSameDayConf = sameDayGroups.find(g => g.some(c => c.code === item.code));
        if (itemSameDayConf && !itemTimeslotConf) {
            const others = itemSameDayConf.filter(c => c.code !== item.code).map(c => c.code).join(', ');
            localWarningsHTML += `<div class="card-inline-alert card-alert-warning"><span class="alert-icon">⚠</span> Same Day Exam as ${others}</div>`;
        }

        card.innerHTML = `
            <button class="remove-course-btn" aria-label="Remove Course" title="Remove course">✕</button>
            <div class="result-info">
                <div class="course-code-badge">${item.code}</div>
                <h3 class="course-title">${item.title}</h3>
                ${prereqList}
                ${localWarningsHTML ? `<div class="card-alerts-container">${localWarningsHTML}</div>` : ''}
            </div>
            <div class="time-info">
                <div class="day-badge">Day ${item.day}</div>
                <div class="time-slot">${timeDisplay}</div>
                <div class="period">Slot ${item.period}</div>
            </div>
        `;

        const removeBtn = card.querySelector('.remove-course-btn');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parts = inputField.value.split(',').map(p => p.trim()).filter(p => p.length > 0);
            const nq = normalize(item.code);
            const newParts = parts.filter(p => !normalize(p).includes(nq));

            if (newParts.length > 0) {
                inputField.value = newParts.join(', ') + ', ';
            } else {
                inputField.value = '';
            }
            handleSearch();
        });

        resultsContainer.appendChild(card);
    });

    if (results.length > 0) {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'download-btn-container';
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'glass-btn download-routine-btn';
        downloadBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Routine (PNG)
        `;
        downloadBtn.addEventListener('click', () => generateRoutineImage(results));
        btnContainer.appendChild(downloadBtn);
        resultsContainer.appendChild(btnContainer);
    }
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

// Routine Image Export Logic
const generateRoutineImage = async (results) => {
    const exportContainer = document.getElementById('export-container');
    exportContainer.innerHTML = '';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'routine-table-wrapper';
    
    const title = document.createElement('h2');
    title.className = 'routine-export-title';
    title.textContent = 'MY EXAM ROUTINE';
    wrapper.appendChild(title);

    // Prepare table data
    const maxDays = Math.max(...results.map(r => r.day));
    const periods = ['T1', 'T2', 'T3', 'T4', 'T5']; // Assuming 5 slots max
    
    // Find active periods to avoid empty columns
    const activePeriods = periods.filter(p => results.some(r => r.period === p));

    const table = document.createElement('table');
    table.className = 'routine-table';

    // Header
    const thead = document.createElement('thead');
    let headerRow = '<tr><th>Day</th>';
    activePeriods.forEach(p => {
        const timeObj = results.find(r => r.period === p);
        const timeStr = timeObj ? timeObj.time : '';
        headerRow += `<th>Slot ${p}<br><span style="font-size:0.8rem;opacity:0.7">${timeStr}</span></th>`;
    });
    headerRow += '</tr>';
    thead.innerHTML = headerRow;
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');
    for (let day = 1; day <= maxDays; day++) {
        const dayExams = results.filter(r => r.day === day);
        if (dayExams.length === 0) continue; // Skip empty days

        const tr = document.createElement('tr');
        let rowHTML = `<td class="day-col">Day ${day}</td>`;
        
        activePeriods.forEach(p => {
            const examsInSlot = dayExams.filter(r => r.period === p);
            if (examsInSlot.length > 0) {
                const cellContent = examsInSlot.map(exam => `
                    <div class="course-cell">
                        <span class="course-cell-code">${exam.code}</span>
                        <span class="course-cell-title">${exam.title}</span>
                    </div>
                `).join('<hr style="border:0;border-top:1px solid rgba(0,255,204,0.3);margin:0.5rem 0;">');
                rowHTML += `<td>${cellContent}</td>`;
            } else {
                rowHTML += `<td>-</td>`;
            }
        });
        tr.innerHTML = rowHTML;
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrapper.appendChild(table);

    // Add website signature
    const signature = document.createElement('div');
    signature.style.marginTop = '1.5rem';
    signature.style.textAlign = 'center';
    signature.style.fontSize = '0.85rem';
    signature.style.color = 'rgba(255, 255, 255, 0.6)';
    signature.style.letterSpacing = '1px';
    signature.innerHTML = '<strong>Find Your Pain</strong>, created by Yildirim';
    wrapper.appendChild(signature);

    exportContainer.appendChild(wrapper);

    // Render with html2canvas
    if (typeof html2canvas !== 'undefined') {
        try {
            const canvas = await html2canvas(wrapper, {
                backgroundColor: null,
                scale: 2 // High resolution
            });
            const imgData = canvas.toDataURL('image/png');
            
            // Trigger download
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'exam_routine.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('Error generating image:', err);
            alert('Failed to generate image. Please try again.');
        }
    } else {
        alert('html2canvas library is not loaded.');
    }
    
    // Clean up
    exportContainer.innerHTML = '';
};
