import express from "express";

const _router = express.Router();

router.delete("/microchip/:id", (req, res) => {
	const _authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ error: "No auth token provided" });
	}

	const _microchipId = req.params.id;
	// Simulate deletion logic here
	return res.status(200).json({ message: `Deleted microchip ${microchipId}` });
});

export default router;
