interface Assistant {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        voice: {
                provider: string;
                voiceId: string;
        };
        model: {
                provider: string;
                model: string;
        };
        transcriber: {
                provider: string;
                model: string;
                language: string;
        };
}


class VapiClient {
        private apiKey: string;
        private baseUrl = 'https://api.vapi.ai';

        constructor(apiKey: string) {
                this.apiKey = apiKey;
        }

        private async request(endpoint: string, method: string, body?: any) {
                const url = `${this.baseUrl}${endpoint}`;
                const options: RequestInit = {
                        method,
                        headers: {
                                'Authorization': `Bearer ${this.apiKey}`,
                                'Content-Type': 'application/json',
                        },
                        body: body ? JSON.stringify(body) : undefined,
                };

                const response = await fetch(url, options);
                if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
        }

        async getAssistants() {
                const response = await this.request('/assistant', 'GET');
                if (Array.isArray(response)) {
                        return response;
                } else if (typeof response === 'object' && response !== null) {
                        return [response as Assistant];
                } else {
                        throw new Error('Unexpected response from getAssistant.')
                }
        }

        async createAssistant(data: any) {
                return this.request('/assistant', 'POST', data);
        }

        async deleteAssistant(id: string) {
                return this.request(`/assistant/${id}`, 'DELETE');
        }

        async uploadFile(file: File): Promise<{ id: string }> {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('https://api.vapi.ai/file', {
                        method: 'POST',
                        headers: {
                                'Authorization': `Bearer ${this.apiKey}`,
                                // Don't set Content-Type header when using FormData
                        },
                        body: formData
                });

                if (!response.ok) {
                        const errorBody = await response.text();
                        console.error('File upload error:', errorBody);
                        throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
        }

        async getPhoneNumbers() {
                return this.request('/phone-number', 'GET');
        }

        async createPhoneNumber(data: any) {
                const requestBody = {
                        fallbackDestination: {
                                type: "number",
                                numberE164CheckEnabled: true,
                                number: "<string>",
                                extension: "<string>",
                                message: "<string>",
                                description: "<string>"
                        },
                        provider: data.provider || "vapi",
                        numberE164CheckEnabled: true,
                        number: data.number,
                        credentialId: "<string>",
                        name: "<string>",
                        assistantId: data.assistantId,
                        squadId: "<string>",
                        serverUrl: "<string>",
                        serverUrlSecret: "<string>"
                };
                return this.request('/phone-number', 'POST', requestBody);
        }

        async updatePhoneNumber(id: string, data: any) {
                return this.request(`/phone-number/${id}`, 'PATCH', data);
        }

        async deletePhoneNumber(id: string) {
                return this.request(`/phone-number/${id}`, 'DELETE');
        }

}

export default VapiClient;

