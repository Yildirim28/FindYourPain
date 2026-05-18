const routineData = [
  // Day 1
  { day: 1, period: "T1", time: "9:00 - 11:00 AM", course: "ENG 1011/ENG 101 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 1, period: "T2", time: "11:30 - 1:30 PM", course: "ENG 1013/ENG 103 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 1, period: "T3", time: "2:00 - 4:00 PM", course: "MATH 183/ MATH 2183 (BSCSE) MATH 2107 (BSDS)", type: "Mid-Term" },
  { day: 1, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 313/CSE 3313 (BSCSE)", type: "Mid-Term" },
  { day: 1, period: "T1", time: "9:00 - 11:00 AM", course: "CSI 309/CSE 4509 (BSCSE)", type: "Mid-Term" },
  { day: 1, period: "T2", time: "11:30 - 1:30 PM", course: "DS 3885 (BSDS)", type: "Mid-Term" },
  { day: 1, period: "T3", time: "2:00 - 4:00 PM", course: "DS 4211 (BSDS)", type: "Mid-Term" },
  { day: 1, period: "T1", time: "9:00 - 11:00 AM", course: "IPE 401/ IPE 3401 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 1, period: "T2", time: "11:30 - 1:30 PM", course: "CSE 4945 (Elec.)(BSCSE) (Only Final Exam)", type: "Mid-Term" },
  { day: 1, period: "T3", time: "2:00 - 4:00 PM", course: "SOC 101/ SOC 2101 (BSCSE) SOC 2102 (BSDS)", type: "Mid-Term" },
  { day: 1, period: "T1", time: "9:00 - 11:00 AM", course: "DS 4491 (BSDS)", type: "Mid-Term" },
  { day: 1, period: "T2", time: "11:30 - 1:30 PM", course: "CSE 4379(Elec.) (BSCSE)", type: "Mid-Term" },
  { day: 1, period: "T3", time: "2:00 - 4:00 PM", course: "489 (Op II)/ CSE 4889 (BSCSE) (Elec) DS 4889 (BSDS)", type: "Mid-Term" },
  { day: 1, period: "T1", time: "9:00 - 11:00 AM", course: "CSE 3715(Elec.) (BSCSE)", type: "Mid-Term" },

  // Day 2
  { day: 2, period: "T1", time: "9:00 - 11:00 AM", course: "CSI 421 (Op I)/CSE 4621 (Elective) (BSCSE)", type: "Mid-Term" },
  { day: 2, period: "T2", time: "11:30 - 1:30 PM", course: "CSE 425/ CSE 4325 (BSCSE)", type: "Mid-Term" },
  { day: 2, period: "T3", time: "2:00 - 4:00 PM", course: "ACT 111/ ACT 2111 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 2, period: "T1", time: "9:00 - 11:00 AM", course: "CSI 221/ CSE 3521(BSCSE/BSDS)", type: "Mid-Term" },
  { day: 2, period: "T2", time: "11:30 - 1:30 PM", course: "MATH 151/ MATH 1151 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 2, period: "T3", time: "2:00 - 4:00 PM", course: "STAT 205/ MATH 2205 (BSCSE/BSDS)", type: "Mid-Term" },

  // Day 3
  { day: 3, period: "T1", time: "9:00 - 11:00 AM", course: "CSI 341/ CSE 3811 (BSCSE)", type: "Mid-Term" },
  { day: 3, period: "T2", time: "11:30 - 1:30 PM", course: "CSI 219/ CSE 2213 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 3, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 225/ CSE 1325 (BSCSE)", type: "Mid-Term" },
  { day: 3, period: "T1", time: "9:00 - 11:00 AM", course: "CSE 4451 /CSE 451 (Elective/Opt II) (Only Final Exam)", type: "Mid-Term" },
  { day: 3, period: "T2", time: "11:30 - 1:30 PM", course: "CSE 469 (Op II)/ PMG 4101 (BSCSE)", type: "Mid-Term" },
  { day: 3, period: "T3", time: "2:00 - 4:00 PM", course: "BIO 3105 (BSCSE)/ BIO 3107 (BSDS)", type: "Mid-Term" },
  { day: 3, period: "T1", time: "9:00 - 11:00 AM", course: "DS 4123 (BSDS)", type: "Mid-Term" },
  { day: 3, period: "T2", time: "11:30 - 1:30 PM", course: "TEC 2499 (BSCSE/BSDS) (Only Final Exam)", type: "Mid-Term" },
  { day: 3, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 4777 (Elective) (BSCSE)", type: "Mid-Term" },

  // Day 4
  { day: 4, period: "T1", time: "9:00 - 11:00 AM", course: "CSI 411/CSE 4611 (Elective) (BSCSE)", type: "Mid-Term" },
  { day: 4, period: "T2", time: "11:30 - 1:30 PM", course: "CSI 121/ CSE 1111 (BSCSE)", type: "Mid-Term" },
  { day: 4, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 323/ CSE 3711 (BSCSE)", type: "Mid-Term" },
  { day: 4, period: "T2", time: "11:30 - 1:30 PM", course: "CSI 217/CSE 2215 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 4, period: "T3", time: "2:00 - 4:00 PM", course: "DS 4523 (BSDS)", type: "Mid-Term" },
  { day: 4, period: "T1", time: "9:00 - 11:00 AM", course: "CSI 483/CSE 4883(Elective) (BSCSE)", type: "Mid-Term" },
  { day: 4, period: "T2", time: "11:30 - 1:30 PM", course: "DS 1501 (BSDS)", type: "Mid-Term" },
  { day: 4, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 4893/CSE 493 (Elective/Opt II) (BSCSE) (Only Final Exam)", type: "Mid-Term" },
  { day: 4, period: "T1", time: "9:00 - 11:00 AM", course: "CSE 4327 (Elective) (BSCSE)", type: "Mid-Term" },
  { day: 4, period: "T2", time: "11:30 - 1:30 PM", course: "CSE 4435 (Elective) (BSCSE)", type: "Mid-Term" },
  { day: 4, period: "T3", time: "2:00 - 4:00 PM", course: "DS 3101 (BSDS)", type: "Mid-Term" },
  { day: 4, period: "T2", time: "11:30 - 1:30 PM", course: "DS 2251 (BSDS)", type: "Mid-Term" },

  // Day 5
  { day: 5, period: "T1", time: "9:00 - 11:00 AM", course: "MATH 201/MATH 2201 (BSCSE) MATH 1153 (BSDS)", type: "Mid-Term" },
  { day: 5, period: "T2", time: "11:30 - 1:30 PM", course: "CSI 227/ CSE 2217 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 5, period: "T3", time: "2:00 - 4:00 PM", course: "CSI 321/ CSE 3421 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 5, period: "T1", time: "9:00 - 11:00 AM", course: "CSI 311/ CSE 3411 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 5, period: "T1", time: "9:00 - 11:00 AM", course: "EEE 4261 (Only Final Exam) (BSCSE)", type: "Mid-Term" },
  { day: 5, period: "T2", time: "11:30 - 1:30 PM", course: "DS 1101 (BSDS)", type: "Mid-Term" },
  { day: 5, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 4817 (Elec.) (BSCSE)", type: "Mid-Term" },
  { day: 5, period: "T1", time: "9:00 - 11:00 AM", course: "CSE 4511 (BSDS)", type: "Mid-Term" },

  // Day 6
  { day: 6, period: "T1", time: "9:00 - 11:00 AM", course: "BDS 1201 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 6, period: "T2", time: "11:30 - 1:30 PM", course: "CSI 211/ CSE 1115 (BSCSE) DS 1115 (BSDS)", type: "Mid-Term" },
  { day: 6, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 113/EEE 2113 (BSCSE)", type: "Mid-Term" },
  { day: 6, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 123/ EEE 2123 (BSCSE)", type: "Mid-Term" },
  { day: 6, period: "T1", time: "9:00 - 11:00 AM", course: "ECO 213/ ECO 4101 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 6, period: "T2", time: "11:30 - 1:30 PM", course: "CSE 4783 (Elective) (BSCSE)", type: "Mid-Term" },
  { day: 6, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 4531 (Only Final Exam) (BSCSE)", type: "Mid-Term" },
  { day: 6, period: "T1", time: "9:00 - 11:00 AM", course: "DS 3521 (BSDS)", type: "Mid-Term" },
  { day: 6, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 481 (OpII)/CSE 4181 (Elective) (Only Final Exam)", type: "Mid-Term" },

  // Day 7
  { day: 7, period: "T1", time: "9:00 - 11:00 AM", course: "DS 4891 (BSDS)", type: "Mid-Term" },
  { day: 7, period: "T2", time: "11:30 - 1:30 PM", course: "CSI 233/ CSE 2233 (BSCSE)", type: "Mid-Term" },
  { day: 7, period: "T3", time: "2:00 - 4:00 PM", course: "PHY 2105/ PHY 105 (BSCSE/BSDS)", type: "Mid-Term" },
  { day: 7, period: "T1", time: "9:00 - 11:00 AM", course: "CSE 4891/CSE 491 (Elective/Opt II) (BSCSE)", type: "Mid-Term" },
  { day: 7, period: "T3", time: "2:00 - 4:00 PM", course: "CSE 4495/CSE 495 (Elective/ Opt II) (BSCSE) (Only Final Exam)", type: "Mid-Term" },
  { day: 7, period: "T2", time: "11:30 - 1:30 PM", course: "DS 4229 (BSDS)", type: "Mid-Term" },
  { day: 7, period: "T1", time: "9:00 - 11:00 AM", course: "CSE 465 (Op II)/CSE 4165 (Optional) (BSCSE)", type: "Mid-Term" },
  { day: 7, period: "T3", time: "2:00 - 4:00 PM", course: "DS 3881 (BSDS)", type: "Mid-Term" }
];

const inputField = document.getElementById('course-input');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');
const suggestionsBox = document.getElementById('search-suggestions');

// Normalize string for robust searching: remove non-alphanumeric and make lowercase
const normalize = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};

const handleSearch = () => {
    const query = inputField.value.trim();
    if (!query) {
        resultsContainer.innerHTML = '<div class="no-results">Please enter at least one course code to search.</div>';
        return;
    }

    // Split by comma and filter valid search terms
    const parts = query.split(',').map(p => p.trim()).filter(p => p.length >= 2);
    if (parts.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">Please enter at least 2 characters for a course code.</div>';
        return;
    }

    let allResults = [];
    parts.forEach(part => {
        const normalizedQuery = normalize(part);
        const matches = routineData.filter(item => normalize(item.course).includes(normalizedQuery));
        allResults = allResults.concat(matches);
    });

    // Deduplicate results based on day, period, course
    const seen = new Set();
    const uniqueResults = allResults.filter(item => {
        const key = `${item.day}-${item.period}-${item.course}`;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });

    // Sort uniqueResults by day, then period
    uniqueResults.sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;
        return a.period.localeCompare(b.period);
    });

    displayResults(uniqueResults);
    suggestionsBox.classList.add('hidden');
};

const displayResults = (results) => {
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No exams found for this course code.</div>';
        return;
    }

    results.forEach((item, index) => {
        const isEven = item.day % 2 === 0;
        const cardClass = isEven ? 'result-card glass-panel day-even' : 'result-card glass-panel';
        
        const card = document.createElement('div');
        card.className = cardClass;
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="result-info">
                <h3 class="course-title">${item.course}</h3>
            </div>
            <div class="time-info">
                <div class="day-badge">Day ${item.day}</div>
                <div class="time-slot">${item.time}</div>
                <div class="period">Slot ${item.period}</div>
            </div>
        `;
        
        resultsContainer.appendChild(card);
    });
};

searchBtn.addEventListener('click', handleSearch);

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Suggestions logic as user types
inputField.addEventListener('input', () => {
    const value = inputField.value;
    const parts = value.split(',');
    const lastPart = parts[parts.length - 1].trim();

    if (lastPart.length < 2) {
        suggestionsBox.classList.add('hidden');
        return;
    }

    const normalizedLast = normalize(lastPart);
    const uniqueCourses = [...new Set(routineData.map(item => item.course))];
    const matches = uniqueCourses.filter(course => normalize(course).includes(normalizedLast)).slice(0, 5);

    if (matches.length === 0) {
        suggestionsBox.classList.add('hidden');
        return;
    }

    suggestionsBox.innerHTML = '';
    matches.forEach(match => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = match;
        div.addEventListener('click', () => {
            parts[parts.length - 1] = ' ' + match;
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

// Open Modal
btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    renderAllCourses();
});

// Close Modal
span.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
    if (typeof contactModal !== 'undefined' && event.target === contactModal) {
        contactModal.classList.add('hidden');
    }
    if (event.target !== inputField && event.target !== suggestionsBox) {
        suggestionsBox.classList.add('hidden');
    }
});

const renderAllCourses = () => {
    allCoursesList.innerHTML = '';
    
    // Extract unique courses
    const uniqueCourses = [...new Set(routineData.map(item => item.course))].sort();
    
    uniqueCourses.forEach((course, index) => {
        const courseEl = document.createElement('div');
        courseEl.className = 'course-list-item';
        courseEl.textContent = course;
        courseEl.style.animationDelay = `${(index % 10) * 0.05}s`;
        courseEl.style.cursor = 'pointer';
        
        courseEl.addEventListener('click', () => {
            const currentValue = inputField.value.trim();
            if (currentValue) {
                const parts = currentValue.split(',').map(p => p.trim()).filter(p => p.length > 0);
                if (!parts.includes(course)) {
                    parts.push(course);
                    inputField.value = parts.join(', ') + ', ';
                }
            } else {
                inputField.value = course + ', ';
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
    contactBtn.addEventListener('click', () => {
        contactModal.classList.remove('hidden');
    });
}

if (closeContactSpan) {
    closeContactSpan.addEventListener('click', () => {
        contactModal.classList.add('hidden');
    });
}

// Refresh & Wave Logic
const refreshBtn = document.getElementById('refresh-btn');
const waveContainer = document.getElementById('wave-container');

if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
        inputField.value = '';
        resultsContainer.innerHTML = '';
        suggestionsBox.classList.add('hidden');

        // Rotate Icon
        refreshBtn.classList.add('refresh-btn-clicked');
        setTimeout(() => {
            refreshBtn.classList.remove('refresh-btn-clicked');
        }, 800);

        // Wave animation origin
        const rect = refreshBtn.getBoundingClientRect();
        const x = e.clientX || (rect.left + rect.width / 2);
        const y = e.clientY || (rect.top + rect.height / 2);

        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;

        waveContainer.appendChild(wave);

        setTimeout(() => {
            wave.remove();
        }, 1400);
    });
}
