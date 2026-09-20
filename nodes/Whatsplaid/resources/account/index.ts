import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAccount = {
	resource: ['account'],
};

export const accountDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAccount,
		},
		options: [
			{
				name: 'Get Capabilities',
				value: 'getCapabilities',
				action: 'Get effective account capabilities',
				description:
					'Get the operations available after applying the account, plan, module, configuration, and connection rules',
				routing: {
					request: {
						method: 'GET',
						url: '/capabilities',
					},
				},
			},
			{
				name: 'Get Modules',
				value: 'getModules',
				action: 'Get active modules',
				description: 'Get the modules enabled for the account',
				routing: { request: { method: 'GET', url: '/modules' } },
			},
			{
				name: 'Get Store',
				value: 'getStore',
				action: 'Get store information',
				description: 'Get the company, modules, and configured data source',
				routing: {
					request: {
						method: 'GET',
						url: '/store',
					},
				},
			},
			{
				name: 'Inspect Data Source',
				value: 'inspectDataSource',
				action: 'Inspect the configured data source',
				description:
					'Inspect configuration and declared capabilities without making a live provider request',
				routing: { request: { method: 'POST', url: '/ecommerce/integration/test' } },
			},
		],
		default: 'getCapabilities',
	},
];
