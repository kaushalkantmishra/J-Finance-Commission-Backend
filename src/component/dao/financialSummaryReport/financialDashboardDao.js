const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchFinancialSummaryReportMillionPlus = async (filters) => {
  const { ulb_name, grant_type, financial_year, sector } = filters;

  let query = `
    SELECT 
      FSR.ulb_id,
      FSR.ulb_name,
      (FSR.number_of_tender_floated + FSR.tender_not_floated) AS approved_project,
      FSR.number_of_tender_floated AS tender_approved,
      FSR.amount AS approved_amount,
      FSR.expenditure,
      FSR.financial_year,
      FSR.grant_type,
      SI.sector,
      SI.city_type
    FROM 
      "FinancialSummaryReport" FSR
    INNER JOIN 
      "Scheme_info" SI
    ON 
      FSR.ulb_name = SI.ulb
    WHERE 
      SI.city_type = 'million plus'
  `;

  const queryParams = [];
  let paramIndex = 1; // Index for PostgreSQL numbered parameters

  // Add optional filters based on the provided parameters
  if (ulb_name) {
    query += ` AND FSR.ulb_name = $${paramIndex}`;
    queryParams.push(ulb_name);
    paramIndex++;
  }
  if (grant_type) {
    query += ` AND FSR.grant_type = $${paramIndex}`;
    queryParams.push(grant_type);
    paramIndex++;
  }
  if (financial_year) {
    query += ` AND FSR.financial_year = $${paramIndex}`;
    queryParams.push(financial_year);
    paramIndex++;
  }
  if (sector) {
    query += ` AND SI.sector = $${paramIndex}`;
    queryParams.push(sector);
    paramIndex++;
  }

  // Ensure the query ends properly before adding ORDER BY
  query += ` ORDER BY FSR.ulb_id ASC`;

  // Execute the raw query using prisma.$queryRawUnsafe
  try {
    return await prisma.$queryRawUnsafe(query, ...queryParams);
  } catch (error) {
    console.error("Error fetching financial summary data:", error);
    throw new Error("Error fetching financial summary data");
  }
};
const fetchFinancialSummaryReportNonMillionPlus = async (filters = {}) => {
  // Destructure filters with default values
  const { ulb_name, grant_type, financial_year, sector } = filters;

  let query = `
    SELECT 
      FSR.ulb_id,
      FSR.ulb_name,
      (FSR.number_of_tender_floated + FSR.tender_not_floated) AS approved_project,
      FSR.number_of_tender_floated AS tender_approved,
      FSR.amount AS approved_amount,
      FSR.expenditure,
      FSR.financial_year,
      FSR.grant_type,
      SI.sector,
      SI.city_type
    FROM 
      "FinancialSummaryReport" FSR
    INNER JOIN 
      "Scheme_info" SI
    ON 
      FSR.ulb_name = SI.ulb
    WHERE 
      SI.city_type = 'non million'
  `;

  const queryParams = [];
  let paramIndex = 1; // Index for PostgreSQL numbered parameters

  // Add optional filters based on the provided parameters
  if (ulb_name) {
    query += ` AND FSR.ulb_name = $${paramIndex}`;
    queryParams.push(ulb_name);
    paramIndex++;
  }
  if (grant_type) {
    query += ` AND FSR.grant_type = $${paramIndex}`;
    queryParams.push(grant_type);
    paramIndex++;
  }
  if (financial_year) {
    query += ` AND FSR.financial_year = $${paramIndex}`;
    queryParams.push(financial_year);
    paramIndex++;
  }
  if (sector) {
    query += ` AND SI.sector = $${paramIndex}`;
    queryParams.push(sector);
    paramIndex++;
  }

  // Ensure the query ends properly before adding ORDER BY
  query += ` ORDER BY FSR.ulb_id ASC`;

  // Execute the raw query using prisma.$queryRawUnsafe
  try {
    return await prisma.$queryRawUnsafe(query, ...queryParams);
  } catch (error) {
    console.error("Error fetching financial summary data:", error);
    throw new Error("Error fetching financial summary data");
  }
};
module.exports = {
  fetchFinancialSummaryReportMillionPlus,
  fetchFinancialSummaryReportNonMillionPlus,
};
