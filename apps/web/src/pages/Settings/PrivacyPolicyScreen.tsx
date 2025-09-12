const PrivacyPolicyScreen = () => {
	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

			<section className="mb-4">
				<h2 className="text-xl font-semibold mb-2">Introduction</h2>
				<p>
					At WhoDoggy?, we take your privacy seriously. This policy explains how
					we collect, use, and protect your personal data when you use our
					mobile and web applications.
				</p>
			</section>

			<section className="mb-4">
				<h2 className="text-xl font-semibold mb-2">Data Collection</h2>
				<p>
					We only collect data necessary to provide our services, including dog
					microchip IDs and user account information. All personal data is
					handled in accordance with UK GDPR and the Data Protection Act 2018.
				</p>
			</section>

			<section className="mb-4">
				<h2 className="text-xl font-semibold mb-2">Data Usage</h2>
				<p>
					Data collected is used solely to facilitate microchip identification
					and to improve our services. We do not share your personal data with
					third parties without your explicit consent.
				</p>
			</section>

			<section className="mb-4">
				<h2 className="text-xl font-semibold mb-2">Security</h2>
				<p>
					We implement appropriate technical and organisational measures to
					protect your data against unauthorised access, alteration, disclosure,
					or destruction.
				</p>
			</section>

			<section className="mb-4">
				<h2 className="text-xl font-semibold mb-2">Your Rights</h2>
				<p>
					You have the right to access, correct, or delete your personal data.
					Please contact our support team for any requests.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-semibold mb-2">Contact Us</h2>
				<p>
					If you have any questions about this privacy policy, please contact us
					at support@whodoggy.com.
				</p>
			</section>
		</div>
	);
};

export default PrivacyPolicyScreen;
