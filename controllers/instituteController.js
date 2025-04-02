const Institute = require("../models/Institute");

// ------------------- Create Institute -------------------
exports.createInstitute = async (req, res) => {
  const { name, code, address } = req.body;
  try {
    const existingInstitute = await Institute.findOne({ where: { code } });
    if (existingInstitute) {
      return res.status(400).json({ message: "Institute with this code already exists" });
    }

    const institute = await Institute.create({ name, code, address });
    res.status(201).json({ message: "Institute created successfully", institute });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Get All Institutes -------------------
exports.getAllInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.findAll();
    res.status(200).json(institutes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Get Institute by ID -------------------
exports.getInstituteById = async (req, res) => {
  const { id } = req.params;
  try {
    const institute = await Institute.findByPk(id);
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }
    res.status(200).json(institute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Update Institute -------------------
exports.updateInstitute = async (req, res) => {
  const { id } = req.params;
  const { name, code, address } = req.body;
  try {
    const institute = await Institute.findByPk(id);
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    await institute.update({ name, code, address });
    res.status(200).json({ message: "Institute updated successfully", institute });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- Delete Institute -------------------
exports.deleteInstitute = async (req, res) => {
  const { id } = req.params;
  try {
    const institute = await Institute.findByPk(id);
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    await institute.destroy();
    res.status(200).json({ message: "Institute deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
