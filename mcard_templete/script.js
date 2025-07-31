// Figma MCP Template Generator - Main Script

class FigmaTemplateGenerator {
    constructor() {
        this.figmaFile = null;
        this.figmaToken = null;
        this.selectedNodes = [];
        
        this.initializeEventListeners();
        this.updateStatus('준비 완료. Figma 파일을 연결해주세요.');
    }

    initializeEventListeners() {
        // Figma 연결 버튼
        document.getElementById('connect-figma').addEventListener('click', () => {
            this.connectToFigma();
        });

        // 템플릿 생성 버튼
        document.getElementById('generate-template').addEventListener('click', () => {
            this.generateTemplate();
        });

        // 다운로드 버튼
        document.getElementById('download-template').addEventListener('click', () => {
            this.downloadTemplate();
        });

        // 수정하기 버튼
        document.getElementById('edit-template').addEventListener('click', () => {
            this.editTemplate();
        });

        // 입력 필드 변경 감지
        document.getElementById('figma-url').addEventListener('input', () => {
            this.validateInputs();
        });

        document.getElementById('figma-token').addEventListener('input', () => {
            this.validateInputs();
        });
    }

    validateInputs() {
        const url = document.getElementById('figma-url').value;
        const token = document.getElementById('figma-token').value;
        const templateType = document.getElementById('template-type').value;
        
        const isValid = url && token && templateType;
        document.getElementById('generate-template').disabled = !isValid;
    }

    async connectToFigma() {
        const url = document.getElementById('figma-url').value;
        const token = document.getElementById('figma-token').value;

        if (!url || !token) {
            this.updateStatus('Figma URL과 Access Token을 입력해주세요.', 'error');
            return;
        }

        this.showProgress(20);
        this.updateStatus('Figma 파일에 연결 중...');

        try {
            // Extract file ID from Figma URL
            const fileId = this.extractFileId(url);
            if (!fileId) {
                throw new Error('유효하지 않은 Figma URL입니다.');
            }

            this.showProgress(50);
            
            // Simulate Figma API call (실제로는 MCP를 통해 연결)
            await this.simulateFigmaConnection(fileId, token);
            
            this.showProgress(100);
            this.updateStatus('Figma 파일 연결 완료!', 'success');
            this.validateInputs();
            
            setTimeout(() => {
                this.hideProgress();
            }, 1000);

        } catch (error) {
            this.hideProgress();
            this.updateStatus(`연결 실패: ${error.message}`, 'error');
        }
    }

    extractFileId(url) {
        const match = url.match(/\/file\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    }

    async simulateFigmaConnection(fileId, token) {
        // 실제 Figma API 호출
        try {
            const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
                headers: {
                    'X-Figma-Token': token
                }
            });
            
            if (!response.ok) {
                throw new Error(`Figma API error: ${response.status}`);
            }
            
            const data = await response.json();
            this.figmaFile = data;
            this.figmaToken = token;
            
            console.log('Figma file data:', data);
            return data;
        } catch (error) {
            console.error('Figma API error:', error);
            throw error;
        }
    }

    async generateTemplate() {
        const templateType = document.getElementById('template-type').value;
        const exportFormat = document.getElementById('export-format').value;
        const responsive = document.getElementById('responsive').checked;

        this.showProgress(30);
        this.updateStatus('템플릿 생성 중...');

        try {
            // Simulate template generation
            await this.simulateTemplateGeneration(templateType, exportFormat, responsive);
            
            this.showProgress(100);
            this.updateStatus('템플릿 생성 완료!', 'success');
            this.showPreview();
            
            setTimeout(() => {
                this.hideProgress();
            }, 1000);

        } catch (error) {
            this.hideProgress();
            this.updateStatus(`생성 실패: ${error.message}`, 'error');
        }
    }

    async simulateTemplateGeneration(templateType, exportFormat, responsive) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // 실제 구현에서는 여기서 템플릿 생성 로직 실행
                this.generatedTemplate = {
                    type: templateType,
                    format: exportFormat,
                    responsive: responsive,
                    files: [
                        { name: 'index.html', content: this.generateHTMLContent() },
                        { name: 'style.css', content: this.generateCSSContent() },
                        { name: 'script.js', content: this.generateJSContent() }
                    ]
                };
                resolve();
            }, 3000);
        });
    }

    generateHTMLContent() {
        return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Template</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Generated from Figma</h1>
        </header>
        <main class="main">
            <div class="card">
                <h2>Sample Component</h2>
                <p>This component was generated from your Figma design.</p>
                <button class="btn">Action Button</button>
            </div>
        </main>
    </div>
    <script src="script.js"></script>
</body>
</html>`;
    }

    generateCSSContent() {
        return `/* Generated CSS from Figma Design */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    text-align: center;
    margin-bottom: 40px;
}

.card {
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 20px;
}

.btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
}

.btn:hover {
    background: #0056b3;
}`;
    }

    generateJSContent() {
        return `// Generated JavaScript from Figma Design
document.addEventListener('DOMContentLoaded', function() {
    console.log('Template loaded successfully!');
    
    // Add interactive functionality here
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked!');
        });
    });
});`;
    }

    showPreview() {
        const previewSection = document.getElementById('preview-section');
        const previewContent = document.getElementById('preview-content');
        
        previewContent.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-gray-50 p-4 rounded">
                    <h3 class="font-semibold mb-2">index.html</h3>
                    <pre class="text-xs text-gray-600 overflow-auto max-h-32">${this.escapeHtml(this.generatedTemplate.files[0].content.substring(0, 200))}...</pre>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                    <h3 class="font-semibold mb-2">style.css</h3>
                    <pre class="text-xs text-gray-600 overflow-auto max-h-32">${this.escapeHtml(this.generatedTemplate.files[1].content.substring(0, 200))}...</pre>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                    <h3 class="font-semibold mb-2">script.js</h3>
                    <pre class="text-xs text-gray-600 overflow-auto max-h-32">${this.escapeHtml(this.generatedTemplate.files[2].content.substring(0, 200))}...</pre>
                </div>
            </div>
        `;
        
        previewSection.style.display = 'block';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    downloadTemplate() {
        if (!this.generatedTemplate) {
            this.updateStatus('다운로드할 템플릿이 없습니다.', 'error');
            return;
        }

        // Create ZIP file (simplified simulation)
        this.updateStatus('파일 다운로드 중...');
        
        // In a real implementation, you would create and download actual files
        setTimeout(() => {
            this.updateStatus('다운로드 완료!', 'success');
            alert('템플릿 다운로드가 완료되었습니다!\n(실제 구현에서는 ZIP 파일이 다운로드됩니다)');
        }, 1000);
    }

    editTemplate() {
        // In a real implementation, this would open a code editor
        alert('템플릿 편집 기능\n(실제 구현에서는 코드 에디터가 열립니다)');
    }

    showProgress(percent) {
        const progressBar = document.getElementById('progress-bar');
        const progressFill = document.getElementById('progress-fill');
        
        progressBar.style.display = 'block';
        progressFill.style.width = percent + '%';
    }

    hideProgress() {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.display = 'none';
    }

    updateStatus(message, type = 'info') {
        const statusContent = document.getElementById('status-content');
        statusContent.textContent = message;
        
        // Remove existing classes
        statusContent.classList.remove('text-red-600', 'text-green-600', 'text-blue-600', 'text-gray-600');
        
        // Add appropriate class based on type
        switch (type) {
            case 'error':
                statusContent.classList.add('text-red-600');
                break;
            case 'success':
                statusContent.classList.add('text-green-600');
                break;
            case 'info':
                statusContent.classList.add('text-blue-600');
                break;
            default:
                statusContent.classList.add('text-gray-600');
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new FigmaTemplateGenerator();
});