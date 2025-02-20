const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * Fetches ULBs along with their financial summary data.
 *
 * This function:
 * 1. Retrieves a list of ULBs and their associated financial summary data from the database.
 * 2. Joins the "ULB" and "FinancialSummaryReport" tables to get comprehensive information.
 *
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of ULBs with financial data.
 *
 * @throws {Error} - Throws an error if the query fails.
 */
const getULBs = async () => {
  try {
    const ulbs = await prisma.$queryRaw`
      SELECT 
        "ULB".id AS id,
        "ULB".ulb_name AS ulb_name,
        "ULB".longitude,
        "ULB".latitude,
        FSR.approved_schemes,
        FSR.fund_release_to_ulbs,
        FSR.amount,
        FSR.project_completed,
        FSR.expenditure,
        FSR.balance_amount,
        FSR.financial_progress_in_percentage,
        FSR.number_of_tender_floated,
        FSR.tender_not_floated,
        FSR.work_in_progress
      FROM 
        "ULB" 
      LEFT JOIN 
        "FinancialSummaryReport" AS FSR
      ON 
        "ULB".id = FSR.ulb_id
      ORDER BY 
        "ULB".id ASC;
    `;

    return ulbs;
  } catch (error) {
    console.error("Error fetching ULBs with financial data:", error);
    throw new Error("Error fetching ULBs with financial data");
  }
};

/**
 * Fetches ULBs along with their schemes and financial progress data.
 *
 * This function:
 * 1. Retrieves a list of ULBs with associated schemes and their financial progress from the database.
 * 2. Joins the "ULB", "FinancialSummaryReport", and "Scheme_info" tables.
 * 3. Filters out schemes with null financial progress.
 *
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of ULBs with scheme data.
 *
 * @throws {Error} - Throws an error if the query fails.
 */
const getULBsAndSchemes = async () => {
  try {
    const result = await prisma.$queryRaw`
      SELECT 
        "ULB".id AS ulb_id,
        "Scheme_info".scheme_id,
        "ULB".ulb_name,
        FSR.approved_schemes AS total_schemes,
        FSR.financial_progress_in_percentage AS financial_progress_percentage_fsr,
        "Scheme_info".financial_progress AS financial_progress_schemeinfo
      FROM 
        "ULB"
      LEFT JOIN 
        "FinancialSummaryReport" AS FSR
      ON 
        "ULB".id = FSR.ulb_id
      LEFT JOIN 
        "Scheme_info"
      ON 
        "ULB".ulb_name = "Scheme_info".ulb
      WHERE
        "Scheme_info".financial_progress IS NOT NULL
      ORDER BY 
        financial_progress_schemeinfo DESC;
    `;

    return result;
  } catch (error) {
    console.error("Error fetching ULB and scheme data:", error);
    throw new Error("Error fetching ULB and scheme data");
  }
};

const getULBInfoByCityType = async (city_type) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT 
        "ULB".id AS ulb_id,
        "ULB".ulb_name,
        "ULB".city_type
      FROM 
        "ULB"
      WHERE 
        "ULB".city_type = ${city_type};
    `;

    return result;
  } catch (error) {
    console.error("Error fetching ULB info by city type:", error);
    throw new Error("Error fetching ULB info by city type");
  }
};

module.exports = {
  getULBs,
  getULBsAndSchemes,
  getULBInfoByCityType,
};
