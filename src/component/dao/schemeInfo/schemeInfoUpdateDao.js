const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * Updates the scheme information in the database based on the provided scheme ID and data.
 *
 * This function:
 * 1. Prepares the update data based on the fields present in the `data` parameter.
 * 2. Updates the `scheme_info` record in the database with the prepared data.
 *
 * @param {string} scheme_id - The ID of the scheme to update.
 * @param {Object} data - The data to update the scheme with.
 * @param {string} [data.sector] - The new sector of the scheme.
 * @param {string} [data.project_completion_status] - The new project completion status.
 * @param {string} [data.tender_floated] - The new tender floated status.
 * @param {number} [data.financial_progress] - The new financial progress amount.
 * @param {number} [data.financial_progress_in_percentage] - The new financial progress percentage.
 * @param {number} [data.project_completion_status_in_percentage] - The new project completion status percentage.
 *
 * @returns {Promise<Object>} - Returns a promise that resolves to the updated scheme record.
 *
 * @throws {Error} - Throws an error if the update operation fails.
 */

const updateSchemeInfo = async (scheme_id, data) => {
  // Prepare the update data object
  const updateData = {};

  // Add fields to updateData only if they are present in the incoming data
  if (data.sector !== undefined) updateData.sector = data.sector;
  if (data.project_completion_status !== undefined)
    updateData.project_completion_status = data.project_completion_status;
  if (data.tender_floated !== undefined)
    updateData.tender_floated = data.tender_floated;
  if (data.financial_progress !== undefined)
    updateData.financial_progress = data.financial_progress;
  if (data.financial_progress_in_percentage !== undefined)
    updateData.financial_progress_in_percentage =
      data.financial_progress_in_percentage;
  if (data.project_completion_status_in_percentage !== undefined)
    updateData.project_completion_status_in_percentage =
      data.project_completion_status_in_percentage;

  try {
    // Perform the update operation
    return await prisma.scheme_info.update({
      where: { scheme_id },
      data: updateData,
    });
  } catch (error) {
    console.error("Error updating scheme information:", error);
    throw new Error("Error updating scheme information");
  }
};

module.exports = {
  updateSchemeInfo,
};
