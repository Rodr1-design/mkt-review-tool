class GarmentEvaluationApp {
    constructor() {
        this.trimIdCounter = 0;
        this.fabricIdCounter = 0;
        this.liningIdCounter = 0;
        this.workmanshipIdCounter = 0;
        this.defaultTrims = [
            'Main label',
            'Care label', 
            'Size label',
            'Buttons',
            'Zipper',
            'Drawcord',
            'Eyelets',
            'Packaging'
        ];
        this.defaultFabrics = [
            'Main Fabric',
            'Fabric Colour',
            'Wash'
        ];
        this.defaultLinings = [
            'Lining Quality',
            'Lining Colour'
        ];
        this.defaultWorkmanship = [
            'Stitch Quality',
            'Puckering',
            'Loose Threads',
            'Seam Allowance',
            'Symmetry',
            'Overall Construction'
        ];
        this.init();
    }

    init() {
        this.initializeDefaultFabrics();
        this.initializeDefaultLinings();
        this.initializeDefaultWorkmanship();
        this.initializeDefaultTrims();
        this.attachEventListeners();
        this.setupStatusColorCoding();
    }

    initializeDefaultFabrics() {
        const container = document.getElementById('fabric-container');
        this.defaultFabrics.forEach(fabricName => {
            this.createFabricElement(fabricName, false);
        });
    }

    initializeDefaultLinings() {
        const container = document.getElementById('lining-container');
        this.defaultLinings.forEach(liningName => {
            this.createLiningElement(liningName, false);
        });
    }

    initializeDefaultWorkmanship() {
        const container = document.getElementById('workmanship-container');
        this.defaultWorkmanship.forEach(workmanshipName => {
            this.createWorkmanshipElement(workmanshipName, false);
        });
    }

    initializeDefaultTrims() {
        const container = document.getElementById('trims-container');
        this.defaultTrims.forEach(trimName => {
            this.createTrimElement(trimName, false);
        });
    }

    createFabricElement(fabricName = '', isCustom = false) {
        const container = document.getElementById('fabric-container');
        const fabricId = isCustom ? `custom-${this.fabricIdCounter++}` : `default-${fabricName.toLowerCase().replace(/\s+/g, '-')}`;
        
        const fabricDiv = document.createElement('div');
        fabricDiv.className = 'dynamic-item';
        fabricDiv.dataset.fabricId = fabricId;
        
        fabricDiv.innerHTML = `
            <input type="text" class="dynamic-item-name" placeholder="Fabric name" value="${fabricName}">
            <div class="dynamic-item-controls">
                <div class="status-with-indicator">
                    <select class="status-dropdown" data-section="fabric" data-item="${fabricId}">
                        <option value="">Select Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Conditionally Approved">Conditionally Approved</option>
                        <option value="Not Approved">Not Approved</option>
                    </select>
                    <span class="status-indicator"></span>
                </div>
                <textarea class="comment-field" placeholder="Comments..." data-section="fabric" data-item="${fabricId}"></textarea>
            </div>
            ${isCustom ? '<button type="button" class="delete-item-btn">Delete</button>' : ''}
        `;
        
        container.appendChild(fabricDiv);
        
        if (isCustom) {
            const deleteBtn = fabricDiv.querySelector('.delete-item-btn');
            deleteBtn.addEventListener('click', () => this.deleteFabric(fabricId));
        }
        
        this.setupStatusColorCodingForElement(fabricDiv);
        return fabricId;
    }

    createLiningElement(liningName = '', isCustom = false) {
        const container = document.getElementById('lining-container');
        const liningId = isCustom ? `custom-${this.liningIdCounter++}` : `default-${liningName.toLowerCase().replace(/\s+/g, '-')}`;
        
        const liningDiv = document.createElement('div');
        liningDiv.className = 'dynamic-item';
        liningDiv.dataset.liningId = liningId;
        
        liningDiv.innerHTML = `
            <input type="text" class="dynamic-item-name" placeholder="Lining name" value="${liningName}">
            <div class="dynamic-item-controls">
                <div class="status-with-indicator">
                    <select class="status-dropdown" data-section="lining" data-item="${liningId}">
                        <option value="">Select Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Conditionally Approved">Conditionally Approved</option>
                        <option value="Not Approved">Not Approved</option>
                    </select>
                    <span class="status-indicator"></span>
                </div>
                <textarea class="comment-field" placeholder="Comments..." data-section="lining" data-item="${liningId}"></textarea>
            </div>
            ${isCustom ? '<button type="button" class="delete-item-btn">Delete</button>' : ''}
        `;
        
        container.appendChild(liningDiv);
        
        if (isCustom) {
            const deleteBtn = liningDiv.querySelector('.delete-item-btn');
            deleteBtn.addEventListener('click', () => this.deleteLining(liningId));
        }
        
        this.setupStatusColorCodingForElement(liningDiv);
        return liningId;
    }

    deleteFabric(fabricId) {
        const fabricElement = document.querySelector(`[data-fabric-id="${fabricId}"]`);
        if (fabricElement) {
            fabricElement.remove();
        }
    }

    deleteLining(liningId) {
        const liningElement = document.querySelector(`[data-lining-id="${liningId}"]`);
        if (liningElement) {
            liningElement.remove();
        }
    }

    createWorkmanshipElement(workmanshipName = '', isCustom = false) {
        const container = document.getElementById('workmanship-container');
        const workmanshipId = isCustom ? `custom-${this.workmanshipIdCounter++}` : `default-${workmanshipName.toLowerCase().replace(/\s+/g, '-')}`;
        
        const workmanshipDiv = document.createElement('div');
        workmanshipDiv.className = 'dynamic-item';
        workmanshipDiv.dataset.workmanshipId = workmanshipId;
        
        workmanshipDiv.innerHTML = `
            <input type="text" class="dynamic-item-name" placeholder="Workmanship item name" value="${workmanshipName}">
            <div class="dynamic-item-controls">
                <div class="status-with-indicator">
                    <select class="status-dropdown" data-section="workmanship" data-item="${workmanshipId}">
                        <option value="">Select Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Conditionally Approved">Conditionally Approved</option>
                        <option value="Not Approved">Not Approved</option>
                    </select>
                    <span class="status-indicator"></span>
                </div>
                <textarea class="comment-field" placeholder="Comments..." data-section="workmanship" data-item="${workmanshipId}"></textarea>
            </div>
            ${isCustom ? '<button type="button" class="delete-item-btn">Delete</button>' : ''}
        `;
        
        container.appendChild(workmanshipDiv);
        
        if (isCustom) {
            const deleteBtn = workmanshipDiv.querySelector('.delete-item-btn');
            deleteBtn.addEventListener('click', () => this.deleteWorkmanship(workmanshipId));
        }
        
        this.setupStatusColorCodingForElement(workmanshipDiv);
        return workmanshipId;
    }

    deleteWorkmanship(workmanshipId) {
        const workmanshipElement = document.querySelector(`[data-workmanship-id="${workmanshipId}"]`);
        if (workmanshipElement) {
            workmanshipElement.remove();
        }
    }

    createTrimElement(trimName = '', isCustom = false) {
        const container = document.getElementById('trims-container');
        const trimId = isCustom ? `custom-${this.trimIdCounter++}` : `default-${trimName.toLowerCase().replace(/\s+/g, '-')}`;
        
        const trimDiv = document.createElement('div');
        trimDiv.className = 'trim-item';
        trimDiv.dataset.trimId = trimId;
        
        trimDiv.innerHTML = `
            <input type="text" class="trim-name-input" placeholder="Trim name" value="${trimName}">
            <div class="trim-controls">
                <div class="status-with-indicator">
                    <select class="trim-status status-dropdown" data-section="trims" data-item="${trimId}">
                        <option value="">Select Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Conditionally Approved">Conditionally Approved</option>
                        <option value="Not Approved">Not Approved</option>
                    </select>
                    <span class="status-indicator"></span>
                </div>
                <textarea class="trim-comment comment-field" placeholder="Comments..." data-section="trims" data-item="${trimId}"></textarea>
            </div>
            ${isCustom ? '<button type="button" class="delete-trim-btn">Delete</button>' : ''}
        `;
        
        container.appendChild(trimDiv);
        
        if (isCustom) {
            const deleteBtn = trimDiv.querySelector('.delete-trim-btn');
            deleteBtn.addEventListener('click', () => this.deleteTrim(trimId));
        }
        
        this.setupStatusColorCodingForElement(trimDiv);
        return trimId;
    }

    deleteTrim(trimId) {
        const trimElement = document.querySelector(`[data-trim-id="${trimId}"]`);
        if (trimElement) {
            trimElement.remove();
        }
    }

    attachEventListeners() {
        // Add fabric button
        document.getElementById('add-fabric-btn').addEventListener('click', () => {
            this.createFabricElement('', true);
        });

        // Add lining button
        document.getElementById('add-lining-btn').addEventListener('click', () => {
            this.createLiningElement('', true);
        });

        // Add workmanship button
        document.getElementById('add-workmanship-btn').addEventListener('click', () => {
            this.createWorkmanshipElement('', true);
        });

        // Add trim button
        document.getElementById('add-trim-btn').addEventListener('click', () => {
            this.createTrimElement('', true);
        });

        // Report format toggle
        document.querySelectorAll('input[name="report-format"]').forEach(radio => {
            radio.addEventListener('change', () => {
                // Regenerate report if there's already content
                if (document.getElementById('report-content').textContent.trim()) {
                    this.generateReport();
                }
            });
        });

        // Generate report button
        document.getElementById('generate-report-btn').addEventListener('click', () => {
            this.generateReport();
        });

        // Copy to clipboard button
        document.getElementById('copy-report-btn').addEventListener('click', () => {
            this.copyToClipboard();
        });

        // Export to txt button
        document.getElementById('export-report-btn').addEventListener('click', () => {
            this.exportToTxt();
        });

        // Auto-enable/disable buttons based on report content
        const reportContent = document.getElementById('report-content');
        const observer = new MutationObserver(() => {
            const hasContent = reportContent.textContent.trim().length > 0;
            document.getElementById('copy-report-btn').disabled = !hasContent;
            document.getElementById('export-report-btn').disabled = !hasContent;
        });
        observer.observe(reportContent, { childList: true, characterData: true, subtree: true });
        
        // History buttons
        document.getElementById('view-history-btn').addEventListener('click', () => {
            this.showReportHistory();
        });
        
        document.getElementById('clear-history-btn').addEventListener('click', () => {
            this.clearReportHistory();
        });
    }
    
    showReportHistory() {
        const history = this.loadReportHistory();
        
        if (history.length === 0) {
            alert('No saved reports found. Generate some reports first!');
            return;
        }
        
        let historyHtml = '<div style="max-height: 400px; overflow-y: auto; padding: 20px; background: white; border: 1px solid #ddd; border-radius: 6px;">';
        historyHtml += '<h3 style="margin-top: 0;">Report History</h3>';
        
        history.forEach((item, index) => {
            historyHtml += `<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 4px;">`;
            historyHtml += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">`;
            historyHtml += `<strong>${item.date}</strong>`;
            historyHtml += `<button onclick="app.copyHistoryReport(${index})" style="background: #3498db; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Copy</button>`;
            historyHtml += `</div>`;
            historyHtml += `<pre style="background: #f8f9fa; padding: 10px; border-radius: 3px; white-space: pre-wrap; font-size: 12px;">${item.report}</pre>`;
            historyHtml += `</div>`;
        });
        
        historyHtml += '</div>';
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); z-index: 1000; display: flex; 
            align-items: center; justify-content: center;
        `;
        modal.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; max-width: 800px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0;">Report History</h2>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Close</button>
                </div>
                ${historyHtml}
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    copyHistoryReport(index) {
        const history = this.loadReportHistory();
        const report = history[index].report;
        
        navigator.clipboard.writeText(report).then(() => {
            alert('Report copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy report');
        });
    }

    setupStatusColorCoding() {
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('status-dropdown')) {
                this.updateStatusColor(e.target);
            }
        });
    }

    setupStatusColorCodingForElement(element) {
        const dropdowns = element.querySelectorAll('.status-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', () => {
                this.updateStatusColor(dropdown);
            });
        });
    }

    updateStatusColor(dropdown) {
        // Remove all status classes
        dropdown.style.borderColor = '#ddd';
        dropdown.style.backgroundColor = 'white';
        
        const value = dropdown.value;
        const indicator = dropdown.parentElement.querySelector('.status-indicator');
        
        if (indicator) {
            indicator.textContent = '';
        }
        
        if (value === 'Approved') {
            dropdown.style.borderColor = '#27ae60';
            dropdown.style.backgroundColor = '#f0f9f4';
            if (indicator) indicator.textContent = '✅';
        } else if (value === 'Conditionally Approved' || value === 'Approved with corrections' || value === 'Approved with comments') {
            dropdown.style.borderColor = '#f39c12';
            dropdown.style.backgroundColor = '#fef9e7';
            if (indicator) indicator.textContent = '⚠️';
        } else if (value === 'Not Approved' || value === 'Resubmit' || value === 'Rejected') {
            dropdown.style.borderColor = '#e74c3c';
            dropdown.style.backgroundColor = '#fdf2f2';
            if (indicator) indicator.textContent = '❌';
        }
    }

    getEvaluationData() {
        const data = {
            fabric: {},
            lining: {},
            trims: {},
            measurements: {},
            workmanship: {},
            finalDecision: {}
        };

        // Fabric & Wash
        const fabricElements = document.querySelectorAll('.dynamic-item[data-fabric-id]');
        fabricElements.forEach(fabricElement => {
            const fabricId = fabricElement.dataset.fabricId;
            const name = fabricElement.querySelector('.dynamic-item-name').value;
            const status = fabricElement.querySelector('.status-dropdown').value;
            const comment = fabricElement.querySelector('.comment-field').value;
            
            if (name.trim()) {
                data.fabric[fabricId] = { name, status, comment };
            }
        });

        // Lining
        const liningElements = document.querySelectorAll('.dynamic-item[data-lining-id]');
        liningElements.forEach(liningElement => {
            const liningId = liningElement.dataset.liningId;
            const name = liningElement.querySelector('.dynamic-item-name').value;
            const status = liningElement.querySelector('.status-dropdown').value;
            const comment = liningElement.querySelector('.comment-field').value;
            
            if (name.trim()) {
                data.lining[liningId] = { name, status, comment };
            }
        });

        // Trims
        const trimElements = document.querySelectorAll('.trim-item');
        trimElements.forEach(trimElement => {
            const trimId = trimElement.dataset.trimId;
            const name = trimElement.querySelector('.trim-name-input').value;
            const status = trimElement.querySelector('.trim-status').value;
            const comment = trimElement.querySelector('.trim-comment').value;
            
            if (name.trim()) {
                data.trims[trimId] = { name, status, comment };
            }
        });

        // Measurements
        data.measurements.overallStatus = document.querySelector('[data-section="measurements"][data-item="overall-status"]').value;
        data.measurements.requiredChanges = document.getElementById('required-changes').value;

        // Workmanship
        const workmanshipElements = document.querySelectorAll('.dynamic-item[data-workmanship-id]');
        workmanshipElements.forEach(workmanshipElement => {
            const workmanshipId = workmanshipElement.dataset.workmanshipId;
            const name = workmanshipElement.querySelector('.dynamic-item-name').value;
            const status = workmanshipElement.querySelector('.status-dropdown').value;
            const comment = workmanshipElement.querySelector('.comment-field').value;
            
            if (name.trim()) {
                data.workmanship[workmanshipId] = { name, status, comment };
            }
        });

        // Final Decision
        data.finalDecision.decision = document.getElementById('final-decision-dropdown').value;
        data.finalDecision.comments = document.getElementById('final-comments').value;

        return data;
    }

    generateReport() {
        try {
            // Always generate written report
            this.generateWrittenReport();
        } catch (error) {
            console.error('Error generating report:', error);
            document.getElementById('report-content').innerHTML = '<pre>Error generating report: ' + error.message + '</pre>';
        }
    }

    generateWrittenReport() {
        const data = this.getEvaluationData();
        let report = '';

        report += 'Sample Evaluation Report\n';
        report += '========================\n\n';

        // Fabric & Wash Section
        report += 'Fabric & Wash\n';
        report += '-------------\n';
        
        Object.values(data.fabric).forEach(item => {
            if (item.status) {
                const statusSymbol = this.getStatusSymbol(item.status);
                report += `${item.name}: ${statusSymbol} ${this.formatStatusWithComment(item.status, item.comment)}\n`;
            }
        });
        report += '\n';

        // Lining Section
        report += 'Lining\n';
        report += '------\n';
        
        Object.values(data.lining).forEach(item => {
            if (item.status) {
                const statusSymbol = this.getStatusSymbol(item.status);
                report += `${item.name}: ${statusSymbol} ${this.formatStatusWithComment(item.status, item.comment)}\n`;
            }
        });
        report += '\n';

        // Trims Section
        report += 'Trims\n';
        report += '-----\n';
        
        Object.values(data.trims).forEach(trim => {
            if (trim.status) {
                const statusSymbol = this.getStatusSymbol(trim.status);
                report += `${trim.name}: ${statusSymbol} ${this.formatStatusWithComment(trim.status, trim.comment)}\n`;
            }
        });
        report += '\n';

        // Measurements Section
        report += 'Measurements\n';
        report += '------------\n';
        
        if (data.measurements.overallStatus) {
            const statusSymbol = this.getStatusSymbol(data.measurements.overallStatus);
            report += `Overall Status: ${statusSymbol} ${data.measurements.overallStatus}\n`;
        }
        
        if (data.measurements.requiredChanges.trim()) {
            report += `Required Changes: ${data.measurements.requiredChanges}\n`;
        }
        report += '\n';

        // Workmanship Section
        report += 'Workmanship\n';
        report += '-----------\n';
        
        Object.values(data.workmanship).forEach(item => {
            if (item.status) {
                const statusSymbol = this.getStatusSymbol(item.status);
                report += `${item.name}: ${statusSymbol} ${this.formatStatusWithComment(item.status, item.comment)}\n`;
            }
        });
        report += '\n';

        // Final Decision Section
        report += 'Final Decision\n';
        report += '--------------\n';
        
        if (data.finalDecision.decision) {
            const statusSymbol = this.getStatusSymbol(data.finalDecision.decision);
            report += `Decision: ${statusSymbol} ${data.finalDecision.decision}\n`;
        }
        
        if (data.finalDecision.comments.trim()) {
            report += `Final Comments: ${data.finalDecision.comments}\n`;
        }

        // Display the report as plain text
        document.getElementById('report-content').innerHTML = `<pre>${report}</pre>`;
        
        // Save to localStorage
        this.saveReportToHistory(report);
    }
    
    saveReportToHistory(report) {
        const timestamp = new Date().toISOString();
        const history = JSON.parse(localStorage.getItem('garmentReportHistory') || '[]');
        
        history.unshift({
            timestamp: timestamp,
            report: report,
            date: new Date().toLocaleString()
        });
        
        // Keep only last 50 reports
        if (history.length > 50) {
            history.splice(50);
        }
        
        localStorage.setItem('garmentReportHistory', JSON.stringify(history));
        console.log('Report saved to history');
    }
    
    loadReportHistory() {
        const history = JSON.parse(localStorage.getItem('garmentReportHistory') || '[]');
        return history;
    }
    
    clearReportHistory() {
        if (confirm('Are you sure you want to clear all saved reports? This cannot be undone.')) {
            localStorage.removeItem('garmentReportHistory');
            alert('Report history cleared successfully.');
        }
    }

    generateSimpleTableReport() {
        const data = this.getEvaluationData();
        let report = '';

        report += 'Sample Evaluation Report (Simple Table)\n';
        report += '=====================================\n\n';

        const createSimpleTable = (title, items) => {
            if (items.length === 0 || !items.some(item => item.status)) return '';
            
            let section = `<div class="table-section">\n`;
            section += `<h3>${title}</h3>\n`;
            section += '<div class="table-scroll-container">\n';
            section += '<table class="data-table">\n';
            section += '<thead>\n<tr>\n<th class="item-column">Item</th>\n<th class="status-column">Status</th>\n<th class="comment-column">Comments</th>\n</tr>\n</thead>\n<tbody>\n';
            
            items.forEach(item => {
                if (item.status) {
                    const statusSymbol = this.getStatusSymbol(item.status);
                    const comment = item.comment && item.comment.trim() ? item.comment : '';
                    section += '<tr>\n';
                    section += `<td class="item-column">${item.name}</td>\n`;
                    section += `<td class="status-column">${statusSymbol} ${item.status}</td>\n`;
                    section += `<td class="comment-column">${comment}</td>\n`;
                    section += '</tr>\n';
                }
            });
            
            section += '</tbody>\n</table>\n</div>\n</div>\n';
            return section;
        };

        // Sections
        report += createSimpleTable('Fabric & Wash', Object.values(data.fabric));
        report += createSimpleTable('Lining', Object.values(data.lining));
        report += createSimpleTable('Trims', Object.values(data.trims));
        
        // Measurements
        report += '<div class="table-section">\n<h3>Measurements</h3>\n';
        report += '<table class="data-table">\n';
        report += '<thead>\n<tr>\n<th class="item-column">Item</th>\n<th class="status-column">Status/Value</th>\n<th class="comment-column">Comments</th>\n</tr>\n</thead>\n<tbody>\n';
        
        if (data.measurements.overallStatus) {
            const statusSymbol = this.getStatusSymbol(data.measurements.overallStatus);
            report += '<tr>\n';
            report += '<td class="item-column">Overall Status</td>\n';
            report += `<td class="status-column">${statusSymbol} ${data.measurements.overallStatus}</td>\n`;
            report += '<td class="comment-column"></td>\n</tr>\n';
        }
        if (data.measurements.requiredChanges.trim()) {
            report += '<tr>\n';
            report += '<td class="item-column">Required Changes</td>\n';
            report += `<td class="status-column" colspan="2">${data.measurements.requiredChanges}</td>\n`;
            report += '</tr>\n';
        }
        
        report += '</tbody>\n</table>\n</div>\n';
        
        report += createSimpleTable('Workmanship', Object.values(data.workmanship));
        
        // Final Decision
        report += '<div class="table-section">\n<h3>Final Decision</h3>\n';
        report += '<table class="data-table">\n';
        report += '<thead>\n<tr>\n<th class="item-column">Item</th>\n<th class="status-column">Status/Value</th>\n<th class="comment-column">Comments</th>\n</tr>\n</thead>\n<tbody>\n';
        
        if (data.finalDecision.decision) {
            const statusSymbol = this.getStatusSymbol(data.finalDecision.decision);
            report += '<tr>\n';
            report += '<td class="item-column">Decision</td>\n';
            report += `<td class="status-column">${statusSymbol} ${data.finalDecision.decision}</td>\n`;
            report += '<td class="comment-column"></td>\n</tr>\n';
        }
        if (data.finalDecision.comments.trim()) {
            report += '<tr>\n';
            report += '<td class="item-column">Final Comments</td>\n';
            report += `<td class="status-column" colspan="2">${data.finalDecision.comments}</td>\n`;
            report += '</tr>\n';
        }
        
        report += '</tbody>\n</table>\n</div>\n';

        document.getElementById('report-content').innerHTML = report;
    }

    generateDetailedTableReport() {
        console.log('Generating detailed table report...'); // Debug line
        const data = this.getEvaluationData();
        let report = '';

        report += '<div class="report-header">\n<h2>Sample Evaluation Report (Detailed Table)</h2>\n</div>\n';

        const createDetailedTable = (title, items) => {
            if (items.length === 0 || !items.some(item => item.status)) return '';
            
            let section = `<div class="table-section">\n`;
            section += `<h3>${title}</h3>\n`;
            section += '<div class="table-scroll-container">\n';
            section += '<table class="data-table">\n';
            section += '<thead>\n<tr>\n<th class="item-column">Item</th>\n<th class="status-column">Status</th>\n<th class="comment-column">Comments</th>\n</tr>\n</thead>\n<tbody>\n';
            
            items.forEach(item => {
                if (item.status) {
                    const statusSymbol = this.getStatusSymbol(item.status);
                    const comment = item.comment && item.comment.trim() ? item.comment : '';
                    section += '<tr>\n';
                    section += `<td class="item-column">${item.name}</td>\n`;
                    section += `<td class="status-column">${statusSymbol} ${item.status}</td>\n`;
                    section += `<td class="comment-column">${comment}</td>\n`;
                    section += '</tr>\n';
                }
            });
            
            section += '</tbody>\n</table>\n</div>\n</div>\n';
            return section;
        };

        // Sections
        report += createDetailedTable('Fabric & Wash', Object.values(data.fabric));
        report += createDetailedTable('Lining', Object.values(data.lining));
        report += createDetailedTable('Trims', Object.values(data.trims));
        
        // Measurements
        report += '<div class="table-section">\n<h3>Measurements</h3>\n';
        report += '<table class="data-table">\n';
        report += '<thead>\n<tr>\n<th class="item-column">Item</th>\n<th class="status-column">Status/Value</th>\n<th class="comment-column">Comments</th>\n</tr>\n</thead>\n<tbody>\n';
        
        if (data.measurements.overallStatus) {
            const statusSymbol = this.getStatusSymbol(data.measurements.overallStatus);
            report += '<tr>\n';
            report += '<td class="item-column">Overall Status</td>\n';
            report += `<td class="status-column">${statusSymbol} ${data.measurements.overallStatus}</td>\n`;
            report += '<td class="comment-column"></td>\n</tr>\n';
        }
        if (data.measurements.requiredChanges.trim()) {
            report += '<tr>\n';
            report += '<td class="item-column">Required Changes</td>\n';
            report += `<td class="status-column" colspan="2">${data.measurements.requiredChanges}</td>\n`;
            report += '</tr>\n';
        }
        
        report += '</tbody>\n</table>\n</div>\n';
        
        report += createDetailedTable('Workmanship', Object.values(data.workmanship));
        
        // Final Decision
        report += '<div class="table-section">\n<h3>Final Decision</h3>\n';
        report += '<table class="data-table">\n';
        report += '<thead>\n<tr>\n<th class="item-column">Item</th>\n<th class="status-column">Status/Value</th>\n<th class="comment-column">Comments</th>\n</tr>\n</thead>\n<tbody>\n';
        
        if (data.finalDecision.decision) {
            const statusSymbol = this.getStatusSymbol(data.finalDecision.decision);
            report += '<tr>\n';
            report += '<td class="item-column">Decision</td>\n';
            report += `<td class="status-column">${statusSymbol} ${data.finalDecision.decision}</td>\n`;
            report += '<td class="comment-column"></td>\n</tr>\n';
        }
        if (data.finalDecision.comments.trim()) {
            report += '<tr>\n';
            report += '<td class="item-column">Final Comments</td>\n';
            report += `<td class="status-column" colspan="2">${data.finalDecision.comments}</td>\n`;
            report += '</tr>\n';
        }
        
        report += '</tbody>\n</table>\n</div>\n';

        document.getElementById('report-content').innerHTML = report;
    }

    generateCompactTableReport() {
        const data = this.getEvaluationData();
        let report = '';

        report += '<div class="report-header">\n<h2>Sample Evaluation Report (Compact Table)</h2>\n</div>\n';

        const createCompactTable = (title, items) => {
            if (items.length === 0 || !items.some(item => item.status)) return '';
            
            let section = `<div class="table-section">\n`;
            section += `<h3>${title}</h3>\n`;
            section += '<div class="table-scroll-container">\n';
            section += '<table class="data-table">\n';
            section += '<thead>\n<tr>\n<th class="item-column">Item</th>\n<th class="status-column">Status</th>\n<th class="comment-column">Comments</th>\n</tr>\n</thead>\n<tbody>\n';
            
            items.forEach(item => {
                if (item.status) {
                    const statusSymbol = this.getStatusSymbol(item.status);
                    const statusAbbr = this.getStatusAbbreviation(item.status);
                    const comment = item.comment && item.comment.trim() ? item.comment : '';
                    section += '<tr>\n';
                    section += `<td class="item-column">${item.name}</td>\n`;
                    section += `<td class="status-column">${statusSymbol} ${statusAbbr}</td>\n`;
                    section += `<td class="comment-column">${comment}</td>\n`;
                    section += '</tr>\n';
                }
            });
            
            section += '</tbody>\n</table>\n</div>\n</div>\n';
            return section;
        };

        // All sections in compact format
        report += createCompactTable('Fabric & Wash', Object.values(data.fabric));
        report += createCompactTable('Lining', Object.values(data.lining));
        report += createCompactTable('Trims', Object.values(data.trims));
        
        // Measurements
        report += '<div class="table-section">\n<h3>Measurements</h3>\n';
        report += '<table class="data-table">\n';
        report += '<thead>\n<tr>\n<th class="item-column">Item</th>\n<th class="status-column">Status/Value</th>\n<th class="comment-column">Comments</th>\n</tr>\n</thead>\n<tbody>\n';
        
        if (data.measurements.overallStatus) {
            const statusSymbol = this.getStatusSymbol(data.measurements.overallStatus);
            const statusAbbr = this.getStatusAbbreviation(data.measurements.overallStatus);
            report += '<tr>\n';
            report += '<td class="item-column">Overall Status</td>\n';
            report += `<td class="status-column">${statusSymbol} ${statusAbbr}</td>\n`;
            report += '<td class="comment-column"></td>\n</tr>\n';
        }
        if (data.measurements.requiredChanges.trim()) {
            report += '<tr>\n';
            report += '<td class="item-column">Required Changes</td>\n';
            report += `<td class="status-column" colspan="2">${data.measurements.requiredChanges}</td>\n`;
            report += '</tr>\n';
        }
        
        report += '</tbody>\n</table>\n</div>\n';
        
        report += createCompactTable('Workmanship', Object.values(data.workmanship));
        
        // Final Decision
        report += '<div class="table-section">\n<h3>Final Decision</h3>\n';
        report += '<table class="data-table">\n';
        report += '<thead>\n<tr>\n<th class="item-column">Item</th>\n<th class="status-column">Status/Value</th>\n<th class="comment-column">Comments</th>\n</tr>\n</thead>\n<tbody>\n';
        
        if (data.finalDecision.decision) {
            const statusSymbol = this.getStatusSymbol(data.finalDecision.decision);
            const statusAbbr = this.getStatusAbbreviation(data.finalDecision.decision);
            report += '<tr>\n';
            report += '<td class="item-column">Decision</td>\n';
            report += `<td class="status-column">${statusSymbol} ${statusAbbr}</td>\n`;
            report += '<td class="comment-column"></td>\n</tr>\n';
        }
        if (data.finalDecision.comments.trim()) {
            report += '<tr>\n';
            report += '<td class="item-column">Final Comments</td>\n';
            report += `<td class="status-column" colspan="2">${data.finalDecision.comments}</td>\n`;
            report += '</tr>\n';
        }
        
        report += '</tbody>\n</table>\n</div>\n';

        document.getElementById('report-content').innerHTML = report;
    }

    getStatusSymbol(status) {
        if (status === 'Approved') return '✅';
        if (status === 'Conditionally Approved' || status === 'Approved with corrections' || status === 'Approved with comments') return '⚠️';
        if (status === 'Not Approved' || status === 'Resubmit' || status === 'Rejected') return '❌';
        return '⏳';
    }

    getStatusAbbreviation(status) {
        if (status === 'Approved') return 'APPR';
        if (status === 'Conditionally Approved') return 'COND';
        if (status === 'Approved with corrections') return 'CORR';
        if (status === 'Approved with comments') return 'COMM';
        if (status === 'Not Approved') return 'NAPP';
        if (status === 'Resubmit') return 'RESUB';
        if (status === 'Rejected') return 'REJ';
        return status;
    }

    formatStatusWithComment(status, comment) {
        if (!status) return '';
        
        let result = status;
        
        if ((status === 'Conditionally Approved' || status === 'Not Approved' || 
             status === 'Approved with corrections' || status === 'Approved with comments') && 
            comment && comment.trim()) {
            result += ` – ${comment.trim()}`;
        }
        
        return result;
    }

    copyToClipboard() {
        const reportContent = document.getElementById('report-content');
        const textToCopy = reportContent.textContent;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Show success feedback
            const copyBtn = document.getElementById('copy-report-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '#3498db';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy to clipboard. Please try again.');
        });
    }
    
    convertTableToHTML(format) {
        const data = this.getEvaluationData();
        let html = '';
        
        if (format === 'table-detailed') {
            html += '<h2>Sample Evaluation Report (Detailed Table)</h2>\n';
            
            html += this.createHTMLTable('Fabric & Wash', Object.values(data.fabric));
            html += this.createHTMLTable('Lining', Object.values(data.lining));
            html += this.createHTMLTable('Trims', Object.values(data.trims));
            
            // Measurements
            html += '<div style="margin: 20px 0;"><h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Measurements</h3>\n';
            html += '<table style="border: 2px solid #333; border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px;">\n';
            html += '<tr style="background-color: #f5f5f5; font-weight: bold;"><th style="border: 1px solid #333; padding: 10px; text-align: left; width: 35%;">Item</th><th style="border: 1px solid #333; padding: 10px; text-align: center; width: 25%;">Status/Value</th><th style="border: 1px solid #333; padding: 10px; text-align: left; width: 40%;">Comments</th></tr>\n';
            
            if (data.measurements.overallStatus) {
                const statusSymbol = this.getStatusSymbol(data.measurements.overallStatus);
                html += `<tr><td style="border: 1px solid #333; padding: 10px; font-weight: bold; background-color: #fafafa;">Overall Status</td><td style="border: 1px solid #333; padding: 10px; text-align: center; background-color: #fafafa;">${statusSymbol} ${data.measurements.overallStatus}</td><td style="border: 1px solid #333; padding: 10px; background-color: #fafafa;"></td></tr>\n`;
            }
            if (data.measurements.requiredChanges.trim()) {
                html += `<tr><td style="border: 1px solid #333; padding: 10px; font-weight: bold; background-color: #fafafa;">Required Changes</td><td style="border: 1px solid #333; padding: 10px; background-color: #fafafa;" colspan="2">${data.measurements.requiredChanges}</td></tr>\n`;
            }
            
            html += '</table></div>\n';
            
            html += this.createHTMLTable('Workmanship', Object.values(data.workmanship));
            
            // Final Decision
            html += '<div style="margin: 20px 0;"><h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Final Decision</h3>\n';
            html += '<table style="border: 2px solid #333; border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px;">\n';
            html += '<tr style="background-color: #f5f5f5; font-weight: bold;"><th style="border: 1px solid #333; padding: 10px; text-align: left; width: 35%;">Item</th><th style="border: 1px solid #333; padding: 10px; text-align: center; width: 25%;">Status/Value</th><th style="border: 1px solid #333; padding: 10px; text-align: left; width: 40%;">Comments</th></tr>\n';
            
            if (data.finalDecision.decision) {
                const statusSymbol = this.getStatusSymbol(data.finalDecision.decision);
                html += `<tr><td style="border: 1px solid #333; padding: 10px; font-weight: bold; background-color: #fafafa;">Decision</td><td style="border: 1px solid #333; padding: 10px; text-align: center; background-color: #fafafa;">${statusSymbol} ${data.finalDecision.decision}</td><td style="border: 1px solid #333; padding: 10px; background-color: #fafafa;"></td></tr>\n`;
            }
            if (data.finalDecision.comments.trim()) {
                html += `<tr><td style="border: 1px solid #333; padding: 10px; font-weight: bold; background-color: #fafafa;">Final Comments</td><td style="border: 1px solid #333; padding: 10px; background-color: #fafafa;" colspan="2">${data.finalDecision.comments}</td></tr>\n`;
            }
            
            html += '</table></div>\n';
            
        } else if (format === 'table-simple') {
            html += '<h2>Sample Evaluation Report (Simple Table)</h2>\n';
            
            html += this.createHTMLTable('Fabric & Wash', Object.values(data.fabric));
            html += this.createHTMLTable('Lining', Object.values(data.lining));
            html += this.createHTMLTable('Trims', Object.values(data.trims));
            
            // Measurements
            html += '<h3>Measurements</h3>\n';
            html += '<table border="1" style="border-collapse: collapse; width: 100%;">\n';
            html += '<tr><th style="padding: 8px; background: #f0f0f0;">Item</th><th style="padding: 8px; background: #f0f0f0;">Status/Value</th><th style="padding: 8px; background: #f0f0f0;">Comments</th></tr>\n';
            
            if (data.measurements.overallStatus) {
                const statusSymbol = this.getStatusSymbol(data.measurements.overallStatus);
                html += `<tr><td style="padding: 8px; font-weight: bold;">Overall Status</td><td style="padding: 8px; text-align: center;">${statusSymbol} ${data.measurements.overallStatus}</td><td style="padding: 8px;"></td></tr>\n`;
            }
            if (data.measurements.requiredChanges.trim()) {
                html += `<tr><td style="padding: 8px; font-weight: bold;">Required Changes</td><td style="padding: 8px;" colspan="2">${data.measurements.requiredChanges}</td></tr>\n`;
            }
            
            html += '</table>\n<br>\n';
            
            html += this.createHTMLTable('Workmanship', Object.values(data.workmanship));
            
            // Final Decision
            html += '<h3>Final Decision</h3>\n';
            html += '<table border="1" style="border-collapse: collapse; width: 100%;">\n';
            html += '<tr><th style="padding: 8px; background: #f0f0f0;">Item</th><th style="padding: 8px; background: #f0f0f0;">Status/Value</th><th style="padding: 8px; background: #f0f0f0;">Comments</th></tr>\n';
            
            if (data.finalDecision.decision) {
                const statusSymbol = this.getStatusSymbol(data.finalDecision.decision);
                html += `<tr><td style="padding: 8px; font-weight: bold;">Decision</td><td style="padding: 8px; text-align: center;">${statusSymbol} ${data.finalDecision.decision}</td><td style="padding: 8px;"></td></tr>\n`;
            }
            if (data.finalDecision.comments.trim()) {
                html += `<tr><td style="padding: 8px; font-weight: bold;">Final Comments</td><td style="padding: 8px;" colspan="2">${data.finalDecision.comments}</td></tr>\n`;
            }
            
            html += '</table>\n';
            
        } else if (format === 'table-compact') {
            html += '<h2>Sample Evaluation Report (Compact Table)</h2>\n';
            
            html += this.createHTMLTable('Fabric & Wash', Object.values(data.fabric), true);
            html += this.createHTMLTable('Lining', Object.values(data.lining), true);
            html += this.createHTMLTable('Trims', Object.values(data.trims), true);
            
            // Measurements
            html += '<h3>Measurements</h3>\n';
            html += '<table border="1" style="border-collapse: collapse; width: 100%;">\n';
            html += '<tr><th style="padding: 8px; background: #f0f0f0;">Item</th><th style="padding: 8px; background: #f0f0f0;">Status/Value</th><th style="padding: 8px; background: #f0f0f0;">Comments</th></tr>\n';
            
            if (data.measurements.overallStatus) {
                const statusSymbol = this.getStatusSymbol(data.measurements.overallStatus);
                const statusAbbr = this.getStatusAbbreviation(data.measurements.overallStatus);
                html += `<tr><td style="padding: 8px; font-weight: bold;">Overall Status</td><td style="padding: 8px; text-align: center;">${statusSymbol} ${statusAbbr}</td><td style="padding: 8px;"></td></tr>\n`;
            }
            if (data.measurements.requiredChanges.trim()) {
                html += `<tr><td style="padding: 8px; font-weight: bold;">Required Changes</td><td style="padding: 8px;" colspan="2">${data.measurements.requiredChanges}</td></tr>\n`;
            }
            
            html += '</table>\n<br>\n';
            
            html += this.createHTMLTable('Workmanship', Object.values(data.workmanship), true);
            
            // Final Decision
            html += '<h3>Final Decision</h3>\n';
            html += '<table border="1" style="border-collapse: collapse; width: 100%;">\n';
            html += '<tr><th style="padding: 8px; background: #f0f0f0;">Item</th><th style="padding: 8px; background: #f0f0f0;">Status/Value</th><th style="padding: 8px; background: #f0f0f0;">Comments</th></tr>\n';
            
            if (data.finalDecision.decision) {
                const statusSymbol = this.getStatusSymbol(data.finalDecision.decision);
                const statusAbbr = this.getStatusAbbreviation(data.finalDecision.decision);
                html += `<tr><td style="padding: 8px; font-weight: bold;">Decision</td><td style="padding: 8px; text-align: center;">${statusSymbol} ${statusAbbr}</td><td style="padding: 8px;"></td></tr>\n`;
            }
            if (data.finalDecision.comments.trim()) {
                html += `<tr><td style="padding: 8px; font-weight: bold;">Final Comments</td><td style="padding: 8px;" colspan="2">${data.finalDecision.comments}</td></tr>\n`;
            }
            
            html += '</table>\n';
        }
        
        return html;
    }
    
    createHTMLTable(title, items, useAbbreviations = false) {
        if (items.length === 0 || !items.some(item => item.status)) return '';
        
        let html = `<div style="margin: 20px 0;"><h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">${title}</h3>\n`;
        html += '<table style="border: 2px solid #333; border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px;">\n';
        html += '<tr style="background-color: #f5f5f5; font-weight: bold;"><th style="border: 1px solid #333; padding: 10px; text-align: left; width: 35%;">Item</th><th style="border: 1px solid #333; padding: 10px; text-align: center; width: 25%;">Status</th><th style="border: 1px solid #333; padding: 10px; text-align: left; width: 40%;">Comments</th></tr>\n';
        
        items.forEach(item => {
            if (item.status) {
                const statusSymbol = this.getStatusSymbol(item.status);
                const statusText = useAbbreviations ? 
                    `${statusSymbol} ${this.getStatusAbbreviation(item.status)}` : 
                    `${statusSymbol} ${item.status}`;
                const comment = item.comment && item.comment.trim() ? item.comment : '';
                
                html += `<tr><td style="border: 1px solid #333; padding: 10px; font-weight: bold; background-color: #fafafa;">${item.name}</td><td style="border: 1px solid #333; padding: 10px; text-align: center; background-color: #fafafa;">${statusText}</td><td style="border: 1px solid #333; padding: 10px; background-color: #fafafa;">${comment}</td></tr>\n`;
            }
        });
        
        html += '</table></div>\n';
        return html;
    }
    
    convertTableToText(format) {
        const data = this.getEvaluationData();
        let text = '';
        
        if (format === 'table-detailed') {
            text += 'Sample Evaluation Report (Detailed Table)\n';
            text += '========================================\n\n';
            
            text += this.createTextTable('Fabric & Wash', Object.values(data.fabric));
            text += this.createTextTable('Lining', Object.values(data.lining));
            text += this.createTextTable('Trims', Object.values(data.trims));
            
            // Measurements
            text += 'Measurements\n';
            text += '------------\n';
            if (data.measurements.overallStatus) {
                const statusSymbol = this.getStatusSymbol(data.measurements.overallStatus);
                text += `Overall Status\t${statusSymbol} ${data.measurements.overallStatus}\n`;
            }
            if (data.measurements.requiredChanges.trim()) {
                text += `Required Changes\t${data.measurements.requiredChanges}\n`;
            }
            text += '\n';
            
            text += this.createTextTable('Workmanship', Object.values(data.workmanship));
            
            // Final Decision
            text += 'Final Decision\n';
            text += '--------------\n';
            if (data.finalDecision.decision) {
                const statusSymbol = this.getStatusSymbol(data.finalDecision.decision);
                text += `Decision\t${statusSymbol} ${data.finalDecision.decision}\n`;
            }
            if (data.finalDecision.comments.trim()) {
                text += `Final Comments\t${data.finalDecision.comments}\n`;
            }
            
        } else if (format === 'table-simple') {
            text += 'Sample Evaluation Report (Simple Table)\n';
            text += '=====================================\n\n';
            
            text += this.createTextTable('Fabric & Wash', Object.values(data.fabric));
            text += this.createTextTable('Lining', Object.values(data.lining));
            text += this.createTextTable('Trims', Object.values(data.trims));
            
            // Measurements
            text += 'Measurements\n';
            text += '------------\n';
            if (data.measurements.overallStatus) {
                const statusSymbol = this.getStatusSymbol(data.measurements.overallStatus);
                text += `Overall Status\t${statusSymbol} ${data.measurements.overallStatus}\n`;
            }
            if (data.measurements.requiredChanges.trim()) {
                text += `Required Changes\t${data.measurements.requiredChanges}\n`;
            }
            text += '\n';
            
            text += this.createTextTable('Workmanship', Object.values(data.workmanship));
            
            // Final Decision
            text += 'Final Decision\n';
            text += '--------------\n';
            if (data.finalDecision.decision) {
                const statusSymbol = this.getStatusSymbol(data.finalDecision.decision);
                text += `Decision\t${statusSymbol} ${data.finalDecision.decision}\n`;
            }
            if (data.finalDecision.comments.trim()) {
                text += `Final Comments\t${data.finalDecision.comments}\n`;
            }
            
        } else if (format === 'table-compact') {
            text += 'Sample Evaluation Report (Compact Table)\n';
            text += '=======================================\n\n';
            
            text += this.createTextTable('Fabric & Wash', Object.values(data.fabric), true);
            text += this.createTextTable('Lining', Object.values(data.lining), true);
            text += this.createTextTable('Trims', Object.values(data.trims), true);
            
            // Measurements
            text += 'Measurements\n';
            text += '------------\n';
            if (data.measurements.overallStatus) {
                const statusSymbol = this.getStatusSymbol(data.measurements.overallStatus);
                const statusAbbr = this.getStatusAbbreviation(data.measurements.overallStatus);
                text += `Overall Status\t${statusSymbol} ${statusAbbr}\n`;
            }
            if (data.measurements.requiredChanges.trim()) {
                text += `Required Changes\t${data.measurements.requiredChanges}\n`;
            }
            text += '\n';
            
            text += this.createTextTable('Workmanship', Object.values(data.workmanship), true);
            
            // Final Decision
            text += 'Final Decision\n';
            text += '--------------\n';
            if (data.finalDecision.decision) {
                const statusSymbol = this.getStatusSymbol(data.finalDecision.decision);
                const statusAbbr = this.getStatusAbbreviation(data.finalDecision.decision);
                text += `Decision\t${statusSymbol} ${statusAbbr}\n`;
            }
            if (data.finalDecision.comments.trim()) {
                text += `Final Comments\t${data.finalDecision.comments}\n`;
            }
        }
        
        return text;
    }
    
    createTextTable(title, items, useAbbreviations = false) {
        if (items.length === 0 || !items.some(item => item.status)) return '';
        
        let text = `${title}\n`;
        text += '-'.repeat(title.length) + '\n';
        
        // Add header
        text += 'Item\tStatus\tComments\n';
        text += '-'.repeat(30) + '\t' + '-'.repeat(15) + '\t' + '-'.repeat(40) + '\n';
        
        items.forEach(item => {
            if (item.status) {
                const statusSymbol = this.getStatusSymbol(item.status);
                const statusText = useAbbreviations ? 
                    `${statusSymbol} ${this.getStatusAbbreviation(item.status)}` : 
                    `${statusSymbol} ${item.status}`;
                const comment = item.comment && item.comment.trim() ? item.comment : '';
                
                text += `${item.name}\t${statusText}\t${comment}\n`;
            }
        });
        
        text += '\n';
        return text;
    }

    exportToTxt() {
        const reportContent = document.getElementById('report-content').textContent;
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `sample-evaluation-report-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show success feedback
        const exportBtn = document.getElementById('export-report-btn');
        const originalText = exportBtn.textContent;
        exportBtn.textContent = 'Exported!';
        exportBtn.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            exportBtn.textContent = originalText;
            exportBtn.style.backgroundColor = '#3498db';
        }, 2000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GarmentEvaluationApp();
});
