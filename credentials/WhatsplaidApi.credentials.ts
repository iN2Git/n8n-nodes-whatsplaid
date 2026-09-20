import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WhatsplaidApi implements ICredentialType {
	name = 'whatsplaidApi';

	displayName = 'Whatsplaid API';

	icon = 'file:../nodes/Whatsplaid/whatsplaid.svg' as const;

	documentationUrl =
		'https://github.com/iN2Git/n8n-nodes-whatsplaid?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.whatsplaid.com/v1',
			url: '/capabilities',
			method: 'GET',
		},
	};
}
