import { Link } from "../../../../../";

const _HelpCenterScreen = () => {
	const _helpTopics = [
		{
			title: "Getting Started",
			description: "Learn how to create an account and use the app.",
			link: "/support/help/getting-started",
		},
		{
			title: "Scanning a Dog",
			description: "How to scan a dog’s microchip and view results.",
			link: "/support/help/scanning",
		},
		{
			title: "Managing Your Profile",
			description: "Update your contact details and preferences.",
			link: "/settings/profile",
		},
		{
			title: "Privacy & Security",
			description: "Understand how we protect your data.",
			link: "/settings/privacy-policy",
		},
		{
			title: "Contact Support",
			description: "Need help? Reach out to our support team.",
			link: "/support/contact",
		},
	];

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Help Center</h1>
			<p className="mb-8 text-gray-600">
				Browse common questions and topics below.
			</p>

			<div className="grid md:grid-cols-2 gap-6">
				{helpTopics.map((topic, index) => (
					<Link
						to={topic.link}
						key={index}
						className="block border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
					>
						<h2 className="text-xl font-semibold mb-1">{topic.title}</h2>
						<p className="text-gray-600">{topic.description}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default HelpCenterScreen;
