// --- Mobile Menu Toggle ---
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// --- Contact Form Submission & Success Modal ---
const inquiryForm = document.getElementById('inquiry-form');
const successModal = document.getElementById('success-modal');
const btnCloseModal = document.getElementById('btn-close-modal');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple visual feedback for submission
        const submitBtn = document.getElementById('btn-submit-inquiry');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Show Success Modal
            successModal.classList.add('active');
            
            // Reset button and form
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            inquiryForm.reset();
        }, 1200);
    });
}

if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
        successModal.classList.remove('active');
    });
}

// Close modal if user clicks on the overlay background
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});


// --- Technical Reference Document Preview ---
const btnToggleFramework = document.getElementById('btn-toggle-framework-doc');
const frameworkViewer = document.getElementById('framework-doc-viewer');
const btnCloseFramework = document.getElementById('btn-close-framework-doc');
const frameworkContent = document.getElementById('framework-doc-content');

const preRenderedFrameworkHTML = `
    <h2>KMH Entity Resolution & Master Data Management Framework</h2>
    <p><em>Enterprise Reference Architecture & Implementation Guide</em></p>
    
    <h3>1. Executive Summary</h3>
    <p>This document outlines the reference Entity Resolution (ER) and Master Data Management (MDM) implementation framework deployed by KMH Data Management and Consultants.</p>
    <p>Having built a reputation for delivering bespoke data architecture and consulting services for major financial firms across Canada, the United States, and Europe, KMH has recently packaged these production-tested patterns into a dedicated, high-performance Entity Resolution product suite.</p>
    <p>Our solution automates the ingestion of raw, unstructured files, cleanses inconsistencies, and resolves fragmented entities across internal and third-party registries (such as Dun & Bradstreet (D&B) and Standard & Poor’s (S&P)). This framework provides a critical foundation for <strong>Know Your Customer (KYC)</strong> registries, <strong>Master Data Management (MDM)</strong> systems, <strong>Anti-Money Laundering (AML)</strong> monitoring, and <strong>Fraud Detection</strong> architectures—building enriched, high-context <strong>Golden Records</strong> suitable for strict enterprise compliance and operational workflows.</p>
    
    <h3>2. System Architecture & Reference Pipeline</h3>
    <p>KMH utilizes a modular, decoupled architecture optimized for streaming pipelines (e.g., Apache Spark (batch & streaming), Apache Flink, Apache Kafka) and storage layers (e.g., Delta Lake).</p>
    
    <div style="background-color: #060912; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px; margin: 20px 0;">
        <strong style="color: #00f2fe; display: block; margin-bottom: 10px;">Pipeline Dataflow:</strong>
        <ol>
            <li style="margin-bottom: 8px;"><strong>1. Data Pipeline Setup & Data Ingestion:</strong> Connect raw, dirty, unstructured data systems, scheduling pipelines that ingestion-engineer files securely into an enterprise Data Lake.</li>
            <li style="margin-bottom: 8px;"><strong>2. Data Cleansing & Deduplication:</strong> Run standardized validation rules (phone, email, state mappings), resolve global addresses using bespoke and custom parsers (NLP-based), and filter exact duplicate rows in the ingestion staging table.</li>
            <li style="margin-bottom: 8px;"><strong>3. Entity Resolution:</strong> Cluster disjoint records using smart candidate blocking keys and similarity algorithms (Jaro-Winkler, Levenshtein distance).</li>
            <li style="margin-bottom: 8px;"><strong>5. Master Data Management:</strong> Compile the master golden records based on survivorship rules and schedule synchronization loops back to target databases.</li>
        </ol>
    </div>

    <h3>3. Cleansing & Standardization Rules</h3>
    <p>High-accuracy Entity Resolution relies on strict data normalization. KMH implements the following standard rules:</p>
    <table>
        <thead>
            <tr>
                <th>Attribute</th>
                <th>Normalization Technique</th>
                <th>Example Input</th>
                <th>Normalized Output</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Phone Number</strong></td>
                <td>Strip non-numeric characters, preserve country code "+"</td>
                <td>(555) 019-2834 ext. 12</td>
                <td>+15550192834</td>
            </tr>
            <tr>
                <td><strong>Email Address</strong></td>
                <td>Trim, convert to lowercase, validate syntax</td>
                <td> John.Doe@Domain.com </td>
                <td>john.doe@domain.com</td>
            </tr>
            <tr>
                <td><strong>State Code</strong></td>
                <td>Map full names to ISO/Standard postal abbreviations</td>
                <td>New York</td>
                <td>NY</td>
            </tr>
            <tr>
                <td><strong>ZIP Code</strong></td>
                <td>Strip non-numeric and non-hyphen symbols</td>
                <td>10001-2345 (NY)</td>
                <td>10001-2345</td>
            </tr>
            <tr>
                <td><strong>Date of Birth</strong></td>
                <td>Standardize to ISO "YYYY-MM-DD"</td>
                <td>1990/05/14</td>
                <td>1990-05-14</td>
            </tr>
        </tbody>
    </table>

    <h3>4. Key-Based Resolution (Blocking)</h3>
    <p>To resolve individuals and businesses, KMH constructs composite keys from the cleansed attributes. If multiple records share the same composite resolution key, they are merged into the same entity identifier.</p>
    
    <h4>Individual Resolution Keys</h4>
    <p>Individual records are grouped based on the following composite key (in order of priority):</p>
    <pre><code>license_id + first_name + middle_name + date_of_birth + street</code></pre>
    <p><em>Rationale: License ID provides strong unique identification, while name and address details resolve records across systems where identifier formatting differs.</em></p>

    <h4>Business Resolution Keys</h4>
    <p>Business records are grouped using:</p>
    <pre><code>company_name + street</code></pre>
    <p><em>Rationale: Minimizes duplication of corporate entities operating out of the same location under minor name variations.</em></p>

    <h3>5. Survivorship & Golden Record Creation</h3>
    <p>Once a group of duplicate records is clustered under a single resolved Entity ID, the system compiles the Golden Record using Survivorship Rules:</p>
    <ul>
        <li><strong>Most Complete Value:</strong> If Record A has a middle name but Record B does not, the golden record inherits the middle name from Record A.</li>
        <li><strong>Recency:</strong> The system prefers the most recently updated record for highly dynamic fields such as street, phone, and email.</li>
        <li><strong>System Authority:</strong> If conflicting values exist (e.g., different date of birth), the system resolves the conflict by preferring data sources with higher verified trust rankings.</li>
    </ul>

    <h3>6. Architecture & Consultancy Services</h3>
    <p>KMH Data Management and Consultants offers specialized products and advisory services tailored for enterprise environments:</p>
    <ul>
        <li><strong>Dedicated Product Suite:</strong> Deployment and integration of our Entity Resolution and MDM product. Built for secure execution within your firewalls, it can be deployed on-premise or within standard cloud environments (AWS, GCP, Databricks, Snowflake), ensuring that customer data never leaves your secure premise.</li>
        <li><strong>Bespoke Financial Consulting:</strong> Designing high-throughput, secure, and compliant data pipelines for major financial firms in Canada, the United States, and Europe.</li>
        <li><strong>Data Stack & Pipeline Auditing:</strong> Identifying bottlenecks in existing data integration paths, setting up data lakes, and upgrading ingestion frameworks.</li>
        <li><strong>Data Governance & Stewardship:</strong> Formulating custom survivorship business rules, data steward consoles, and compliance frameworks.</li>
    </ul>
`;

if (btnToggleFramework && frameworkViewer) {
    btnToggleFramework.addEventListener('click', () => {
        const isVisible = frameworkViewer.style.display === 'block';
        if (isVisible) {
            frameworkViewer.style.display = 'none';
            btnToggleFramework.textContent = 'Read Framework Document';
        } else {
            // First display our robust embedded markdown-equivalent html
            frameworkContent.innerHTML = preRenderedFrameworkHTML;
            frameworkViewer.style.display = 'block';
            btnToggleFramework.textContent = 'Hide Framework Document';
            frameworkViewer.scrollIntoView({ behavior: 'smooth' });

            // Asynchronously try to fetch the actual markdown file to render it dynamically if running on a server
            fetch('KMH_ER_MDM_Implementation_Framework.md')
                .then(response => {
                    if (response.ok) return response.text();
                    throw new Error('Not local server');
                })
                .then(text => {
                    // Simple Markdown-to-HTML parser logic for a few headers and lists
                    let html = text
                        .replace(/^# (.*$)/gim, '<h2>$1</h2>')
                        .replace(/^## (.*$)/gim, '<h3>$1</h3>')
                        .replace(/^### (.*$)/gim, '<h4>$1</h4>')
                        .replace(/^\* (.*$)/gim, '<li>$1</li>')
                        .replace(/^- (.*$)/gim, '<li>$1</li>')
                        .replace(/`(.*?)`/g, '<code>$1</code>')
                        .replace(/\n\n/g, '<p></p>')
                        .replace(/\|/g, ' &nbsp; '); // simple replacement for tables representation
                    
                    // Put in the styled container
                    frameworkContent.innerHTML = `<div class="markdown-body">${html}</div>`;
                })
                .catch(err => {
                    // Fail silently, keep the high-fidelity pre-rendered HTML
                    console.log('Using pre-rendered copy due to CORS limitations on file:// scheme.');
                });
        }
    });
}

if (btnCloseFramework) {
    btnCloseFramework.addEventListener('click', () => {
        frameworkViewer.style.display = 'none';
        btnToggleFramework.textContent = 'Read Framework Document';
        document.getElementById('framework').scrollIntoView({ behavior: 'smooth' });
    });
}


// --- Entity Resolution Sandbox Engine ---

// Preset Datasets
const individualPreset = [
    {
        "id": "REC-01",
        "record_type": "individual",
        "first_name": "John",
        "middle_name": "A.",
        "last_name": "Smith",
        "street": "123 Main St",
        "city": "New York",
        "state": "ny",
        "zip": "10001",
        "phone": "(555) 123-4567",
        "email": "john.smith@gmail.com",
        "license_id": "DL-998877",
        "date_of_birth": "1985-04-12",
        "source": "crm"
    },
    {
        "id": "REC-02",
        "record_type": "individual",
        "first_name": "john",
        "middle_name": "",
        "last_name": "smith",
        "street": "123 main street",
        "city": "NYC",
        "state": "NY",
        "zip": "10001-1102",
        "phone": "5551234567",
        "email": "JOHN.SMITH@GMAIL.COM",
        "license_id": "DL-998877",
        "date_of_birth": "1985/04/12",
        "source": "erp"
    },
    {
        "id": "REC-03",
        "record_type": "individual",
        "first_name": "J.",
        "middle_name": "Albert",
        "last_name": "Smith",
        "street": "123 Main Street, Apt 2",
        "city": "New York",
        "state": "New York",
        "zip": "10001",
        "phone": "555-123-4567 ext 1",
        "email": "jasmith@acme.com",
        "license_id": "",
        "date_of_birth": "1985-04-12",
        "source": "marketing"
    }
];

const businessPreset = [
    {
        "id": "BIZ-01",
        "record_type": "business",
        "company_name": "KMH Tech Solutions Inc.",
        "street": "456 Enterprise Dr",
        "city": "Toronto",
        "state": "ON",
        "zip": "M5V 2N8",
        "phone": "+1 416-555-0199",
        "email": "contact@kmhtech.com",
        "dnb_id": "DB-4567",
        "source": "crm"
    },
    {
        "id": "BIZ-02",
        "record_type": "business",
        "company_name": "KMH Tech Solutions",
        "street": "456 Enterprise Drive",
        "city": "Toronto",
        "state": "Ontario",
        "zip": "M5V2N8",
        "phone": "4165550199",
        "email": "info@kmhtech.com",
        "dnb_id": "",
        "source": "erp"
    },
    {
        "id": "BIZ-03",
        "record_type": "business",
        "company_name": "Acme Industrial Corp",
        "street": "789 Industrial Pkwy",
        "city": "New York",
        "state": "NY",
        "zip": "10022",
        "phone": "212-555-9900",
        "email": "purchasing@acmeind.com",
        "dnb_id": "DB-9900",
        "source": "marketing"
    }
];

// Similarity Calculation Functions (Levenshtein Distance)
function levenshtein(s1, s2) {
    s1 = (s1 || "").toLowerCase().trim();
    s2 = (s2 || "").toLowerCase().trim();
    if (s1 === s2) return 0;
    if (s1.length === 0) return s2.length;
    if (s2.length === 0) return s1.length;
    
    let matrix = [];
    for (let i = 0; i <= s2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= s1.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= s2.length; i++) {
        for (let j = 1; j <= s1.length; j++) {
            if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    return matrix[s2.length][s1.length];
}

function stringSimilarity(s1, s2) {
    let maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1.0;
    let dist = levenshtein(s1, s2);
    return 1.0 - (dist / maxLen);
}

// Cleansing & Normalization Rules (mirrors the DataCleanser logic)
function cleansePhoneNumber(phone) {
    if (!phone) return null;
    const clean = phone.replace(/[^0-9+]/g, "");
    return clean || null;
}

function cleanseEmailAddress(email) {
    if (!email) return null;
    const lower = email.toLowerCase().trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(lower) ? lower : null;
}

function cleanseState(state) {
    if (!state) return null;
    const s = state.trim().toLowerCase();
    const stateMap = {
        "new york": "NY",
        "ontario": "ON",
        "california": "CA",
        "texas": "TX"
    };
    if (stateMap[s]) return stateMap[s];
    return state.toUpperCase();
}

function cleanseZipCode(zip) {
    if (!zip) return null;
    return zip.replace(/[^0-9a-zA-Z-]/g, "").toUpperCase();
}

// Formulate date from varying inputs
function cleanseDOB(dob) {
    if (!dob) return null;
    const str = dob.trim().replace(/\//g, "-");
    const parts = str.split("-");
    if (parts.length === 3) {
        let y = parts[0], m = parts[1], d = parts[2];
        // Handle year-month-day order
        if (y.length === 4) {
            return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
        }
    }
    return str;
}

function cleanseRecord(rec) {
    const type = (rec.record_type || "individual").toLowerCase();
    
    const cleansed = {
        id: rec.id,
        record_type: type,
        source: rec.source || "api",
        phone: cleansePhoneNumber(rec.phone),
        email: cleanseEmailAddress(rec.email),
        street: rec.street ? rec.street.trim() : null,
        city: rec.city ? rec.city.trim() : null,
        state: cleanseState(rec.state),
        zip: cleanseZipCode(rec.zip)
    };

    if (type === "individual") {
        cleansed.first_name = rec.first_name ? rec.first_name.trim() : "";
        cleansed.middle_name = rec.middle_name ? rec.middle_name.trim() : "";
        cleansed.last_name = rec.last_name ? rec.last_name.trim() : "";
        cleansed.license_id = rec.license_id ? rec.license_id.trim() : "";
        cleansed.date_of_birth = cleanseDOB(rec.date_of_birth);
    } else {
        cleansed.company_name = rec.company_name ? rec.company_name.trim() : "";
        cleansed.dnb_id = rec.dnb_id ? rec.dnb_id.trim() : "";
    }

    return cleansed;
}

// Blocking Key Formulation
function getBlockingKey(rec) {
    if (rec.record_type === "individual") {
        // Individual Blocking logic: license_id OR (first_name + date_of_birth)
        if (rec.license_id) {
            return `LIC-${rec.license_id.toUpperCase()}`;
        } else {
            // Take first initial of first name + date_of_birth
            const initial = rec.first_name ? rec.first_name.charAt(0).toLowerCase() : "";
            const dob = rec.date_of_birth || "0000-00-00";
            return `IND-${initial}-${dob}`;
        }
    } else {
        // Business Blocking logic: dnb_id OR (normalized company name token)
        if (rec.dnb_id) {
            return `DNB-${rec.dnb_id.toUpperCase()}`;
        } else {
            // First word of company name
            const token = rec.company_name ? rec.company_name.split(" ")[0].toLowerCase() : "";
            return `BIZ-${token}`;
        }
    }
}

// Main Resolution Engine Pipeline
function runEntityResolution(rawRecords) {
    // 1. Cleanse & Normalization
    const cleansedRecords = rawRecords.map(rec => cleanseRecord(rec));

    // 2. Blocking & Clustering
    const blocks = {};
    cleansedRecords.forEach(rec => {
        const blockKey = getBlockingKey(rec);
        if (!blocks[blockKey]) {
            blocks[blockKey] = [];
        }
        blocks[blockKey].push(rec);
    });

    // 3. Similarity Resolution & Cluster Linking
    const clusters = [];
    let clusterCounter = 1;

    Object.keys(blocks).forEach(blockKey => {
        const blockRecords = blocks[blockKey];
        
        // Group records in this block based on similarity
        const subClusters = [];
        
        blockRecords.forEach(rec => {
            let matchedSubCluster = null;
            
            for (let sub of subClusters) {
                // Compare record against the head of the subcluster
                const representative = sub[0];
                let isMatch = false;

                if (rec.record_type === "individual") {
                    // If license IDs match exactly, it's a match
                    if (rec.license_id && representative.license_id && rec.license_id === representative.license_id) {
                        isMatch = true;
                    } else {
                        // Otherwise calculate name and address similarity
                        const nameSim = stringSimilarity(rec.last_name, representative.last_name);
                        const streetSim = stringSimilarity(rec.street, representative.street);
                        
                        // High similarity on both matches them
                        if (nameSim > 0.8 && streetSim > 0.7) {
                            isMatch = true;
                        }
                    }
                } else {
                    // Business similarity
                    if (rec.dnb_id && representative.dnb_id && rec.dnb_id === representative.dnb_id) {
                        isMatch = true;
                    } else {
                        const compNameSim = stringSimilarity(rec.company_name, representative.company_name);
                        const streetSim = stringSimilarity(rec.street, representative.street);
                        
                        if (compNameSim > 0.7 && streetSim > 0.7) {
                            isMatch = true;
                        }
                    }
                }

                if (isMatch) {
                    matchedSubCluster = sub;
                    break;
                }
            }

            if (matchedSubCluster) {
                matchedSubCluster.push(rec);
            } else {
                subClusters.push([rec]);
            }
        });

        // Add to main clusters list
        subClusters.forEach(sub => {
            clusters.push({
                id: `EID-${String(clusterCounter++).padStart(3, '0')}`,
                key: blockKey,
                members: sub
            });
        });
    });

    // 4. Survivorship & Golden Record compilation
    const goldenRecords = clusters.map(cluster => {
        const members = cluster.members;
        const recordType = members[0].record_type;
        
        const golden = {
            id: cluster.id,
            record_type: recordType,
            sources: [...new Set(members.map(m => m.source))].join(" + "),
            phone: null,
            email: null,
            street: null,
            city: null,
            state: null,
            zip: null
        };

        // Helper to pick best field: picks longest non-empty value
        const pickBestField = (fieldName) => {
            let best = "";
            members.forEach(m => {
                const val = m[fieldName] || "";
                if (val.length > best.length) {
                    best = val;
                }
            });
            return best || null;
        };

        golden.phone = pickBestField('phone');
        golden.email = pickBestField('email');
        golden.street = pickBestField('street');
        golden.city = pickBestField('city');
        golden.state = pickBestField('state');
        golden.zip = pickBestField('zip');

        if (recordType === "individual") {
            golden.first_name = pickBestField('first_name');
            golden.middle_name = pickBestField('middle_name');
            golden.last_name = pickBestField('last_name');
            golden.license_id = pickBestField('license_id');
            golden.date_of_birth = pickBestField('date_of_birth');
        } else {
            golden.company_name = pickBestField('company_name');
            golden.dnb_id = pickBestField('dnb_id');
        }

        return golden;
    });

    return {
        cleansed: cleansedRecords,
        clusters: clusters,
        golden: goldenRecords
    };
}


// --- Rendering the Sandbox Outputs ---

function renderCleansedColumn(cleansedRecords) {
    const container = document.getElementById('col-cleansed');
    container.innerHTML = "";
    
    cleansedRecords.forEach(rec => {
        const card = document.createElement('div');
        card.className = "entity-card";
        
        const displayName = rec.record_type === "individual" 
            ? `${rec.first_name} ${rec.middle_name ? rec.middle_name + ' ' : ''}${rec.last_name}`
            : rec.company_name;

        const detailRows = rec.record_type === "individual"
            ? `
                <span><strong>DOB:</strong> ${rec.date_of_birth || '<span class="null">N/A</span>'}</span>
                <span><strong>LIC:</strong> ${rec.license_id || '<span class="null">N/A</span>'}</span>
            `
            : `
                <span><strong>DUNS:</strong> ${rec.dnb_id || '<span class="null">N/A</span>'}</span>
            `;

        card.innerHTML = `
            <div class="entity-header">
                <span class="entity-id">${rec.id}</span>
                <span class="entity-tag-source tag-${rec.source}">${rec.source}</span>
            </div>
            <div class="entity-name">${displayName}</div>
            <div class="entity-details">
                <span><strong>Addr:</strong> ${rec.street || ''}, ${rec.city || ''} ${rec.state || ''} ${rec.zip || ''}</span>
                <span><strong>Phone:</strong> ${rec.phone || '<span class="null">N/A</span>'}</span>
                <span><strong>Email:</strong> ${rec.email || '<span class="null">N/A</span>'}</span>
                ${detailRows}
            </div>
        `;
        container.appendChild(card);
    });
}

function renderClustersColumn(clusters) {
    const container = document.getElementById('col-clusters');
    container.innerHTML = "";
    
    clusters.forEach(cluster => {
        const box = document.createElement('div');
        box.className = "cluster-box";
        
        let membersHTML = "";
        cluster.members.forEach(member => {
            const dispName = member.record_type === "individual"
                ? `${member.first_name} ${member.last_name}`
                : member.company_name;
            membersHTML += `
                <div class="member-card">
                    <span class="member-name">${dispName}</span>
                    <span class="member-source">${member.id} (${member.source.toUpperCase()})</span>
                </div>
            `;
        });

        box.innerHTML = `
            <div class="cluster-title-bar">
                <span class="cluster-name">${cluster.id}</span>
                <span class="cluster-key-val">${cluster.key}</span>
            </div>
            <div class="cluster-members">
                ${membersHTML}
            </div>
        `;
        container.appendChild(box);
    });
}

function renderGoldenColumn(goldenRecords) {
    const container = document.getElementById('col-golden');
    container.innerHTML = "";
    
    goldenRecords.forEach(rec => {
        const card = document.createElement('div');
        card.className = "golden-card";
        
        const dispName = rec.record_type === "individual"
            ? `${rec.first_name} ${rec.middle_name ? rec.middle_name + ' ' : ''}${rec.last_name}`
            : rec.company_name;

        const specificFields = rec.record_type === "individual"
            ? `
                <div class="golden-field">
                    <span class="field-label">License ID</span>
                    <span class="field-value">${rec.license_id || '<span class="null">N/A</span>'}</span>
                </div>
                <div class="golden-field">
                    <span class="field-label">Date of Birth</span>
                    <span class="field-value">${rec.date_of_birth || '<span class="null">N/A</span>'}</span>
                </div>
            `
            : `
                <div class="golden-field">
                    <span class="field-label">D-U-N-S Number</span>
                    <span class="field-value">${rec.dnb_id || '<span class="null">N/A</span>'}</span>
                </div>
                <div class="golden-field">
                    <span class="field-label">-</span>
                    <span class="field-value null">Corporate Registry</span>
                </div>
            `;

        card.innerHTML = `
            <div class="golden-title">${dispName}</div>
            <div class="golden-grid">
                <div class="golden-field">
                    <span class="field-label">Entity Id</span>
                    <span class="field-value" style="font-family: monospace; color:#00f2fe;">${rec.id}</span>
                </div>
                <div class="golden-field">
                    <span class="field-label">Linked Sources</span>
                    <span class="field-value" style="font-size:0.7rem; color:#10b981;">${rec.sources}</span>
                </div>
                <div class="golden-field" style="grid-column: span 2;">
                    <span class="field-label">Standard Address</span>
                    <span class="field-value">${rec.street || ''}, ${rec.city || ''} ${rec.state || ''} ${rec.zip || ''}</span>
                </div>
                <div class="golden-field">
                    <span class="field-label">Normalized Phone</span>
                    <span class="field-value">${rec.phone || '<span class="null">N/A</span>'}</span>
                </div>
                <div class="golden-field">
                    <span class="field-label">Clean Email</span>
                    <span class="field-value">${rec.email || '<span class="null">N/A</span>'}</span>
                </div>
                ${specificFields}
            </div>
        `;
        container.appendChild(card);
    });
}

function updateBlockingKeysDisplay(type) {
    const container = document.getElementById('blocking-key-tags');
    if (!container) return;
    
    if (type === "individual") {
        container.innerHTML = `
            <span class="key-tag">license_id</span>
            <span class="key-tag">first_name</span>
            <span class="key-tag">date_of_birth</span>
            <span class="key-tag">street (similarity)</span>
        `;
    } else {
        container.innerHTML = `
            <span class="key-tag">dnb_id</span>
            <span class="key-tag">company_name</span>
            <span class="key-tag">street (similarity)</span>
        `;
    }
}

// Controller Logic for Sandbox Inputs
const presetIndBtn = document.getElementById('preset-ind');
const presetBusBtn = document.getElementById('preset-bus');
const jsonInputArea = document.getElementById('records-json-input');
const btnRunResolution = document.getElementById('btn-run-resolution');
const btnResetDemo = document.getElementById('btn-reset-demo');

let currentPresetType = "individual";

function loadPreset(type) {
    currentPresetType = type;
    if (type === "individual") {
        presetIndBtn.classList.add('active');
        presetBusBtn.classList.remove('active');
        jsonInputArea.value = JSON.stringify(individualPreset, null, 2);
    } else {
        presetIndBtn.classList.remove('active');
        presetBusBtn.classList.add('active');
        jsonInputArea.value = JSON.stringify(businessPreset, null, 2);
    }
    updateBlockingKeysDisplay(type);
    triggerResolution();
}

function triggerResolution() {
    try {
        const rawData = JSON.parse(jsonInputArea.value);
        if (!Array.isArray(rawData)) {
            alert("Error: Input must be a valid JSON array of record objects.");
            return;
        }
        
        const results = runEntityResolution(rawData);
        renderCleansedColumn(results.cleansed);
        renderClustersColumn(results.clusters);
        renderGoldenColumn(results.golden);
    } catch (e) {
        alert("Failed to parse JSON input. Please make sure the JSON syntax is correct. " + e.message);
    }
}

if (presetIndBtn && presetBusBtn && jsonInputArea && btnRunResolution && btnResetDemo) {
    presetIndBtn.addEventListener('click', () => loadPreset('individual'));
    presetBusBtn.addEventListener('click', () => loadPreset('business'));
    
    btnRunResolution.addEventListener('click', triggerResolution);
    btnResetDemo.addEventListener('click', () => loadPreset(currentPresetType));
    
    // Initialize Sandbox on Load
    loadPreset('individual');
}

// --- Lightweight Visitor Analytics (Netlify Form Integration) ---
async function recordVisitorAnalytics() {
    // Only track once per browser session to save Netlify Form submission quotas
    if (sessionStorage.getItem('kmh_visitor_tracked')) {
        return;
    }

    try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) return;
        const data = await res.json();

        const formData = new URLSearchParams();
        formData.append('form-name', 'visitor-analytics');
        formData.append('ip', data.ip || 'Unknown');
        formData.append('country', data.country_name || 'Unknown');
        formData.append('city', data.city || 'Unknown');
        formData.append('isp', data.org || 'Unknown');
        formData.append('browser', navigator.userAgent || 'Unknown');
        formData.append('referrer', document.referrer || 'Direct');

        // Send to Netlify Form Endpoint
        await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        });

        sessionStorage.setItem('kmh_visitor_tracked', 'true');
    } catch (err) {
        console.warn("Analytics tracking skipped:", err.message);
    }
}

window.addEventListener('load', recordVisitorAnalytics);
