const Program = require("../models/Program");
const Institute = require("../models/Institute");

// ------------------- Create Program -------------------
exports.createProgram = async (req, res) => {
  const { name, code, instituteId, duration } = req.body;
  try {
    const institute = await Institute.findByPk(instituteId);
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    const existingProgram = await Program.findOne({ where: { code, instituteId } });
    if (existingProgram) {
      return res.status(400).json({ message: "Program with this code already exists in this institute" });
    }

    const program = await Program.create({ name, code, instituteId, duration });
    res.status(201).json({ message: "Program created successfully", program });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Get All Programs -------------------
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({
      include: [{ model: Institute, as: "institute", attributes: ["name"] }],
    });
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Get Program by ID -------------------
exports.getProgramById = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await Program.findByPk(id, {
      include: [{ model: Institute, as: "institute", attributes: ["name"] }],
    });
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Update Program -------------------
exports.updateProgram = async (req, res) => {
  const { id } = req.params;
  const { name, code, instituteId, duration } = req.body;
  try {
    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const institute = await Institute.findByPk(instituteId);
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    await program.update({ name, code, instituteId, duration });
    res.status(200).json({ message: "Program updated successfully", program });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Delete Program -------------------
exports.deleteProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    await program.destroy();
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
