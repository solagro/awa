import XLSX from 'xlsx';
import JSZip from 'jszip';

export const slug = name => name
  .replace(/ - /, '-')
  .replace(/ /g, '-')
  .toLowerCase();

/**
 * Remove extension from input string
 *
 * @param {string} filename Input string
 * @returns {string} Input string without extension
 */
export const removeExt = filename => filename.replace(/\.[^/.]+$/, '');

/**
 * Return Common Spreadsheet Format Workbook from a file content
 *
 * @param {Buffer} buffer File binary content as ArrayBuffer
 * @returns {Object} Workbook conforming Common Spreadsheet Format
 */
export const getWorkbook = buffer => XLSX.read(buffer, { type: 'array' });

/**
 * @param {Object} file Resource from an file input field
 * @return {Object} Object with name and content as ArrayBuffer
 */
export const readFile = file => (
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = () => reject(new Error('file reading was aborted'));
    reader.onerror = () => reject(new Error('file reading has failed'));
    reader.onload = () => resolve({
      filename: file.name,
      content: reader.result,
    });
    reader.readAsArrayBuffer(file);
  })
);

/**
 * Get buffer content from an array of file resources
 *
 * @param {Object[]} fileResources Array of file resources (from file input field)
 * @returns {Object[]} An array of file with name, and content as ArrayBuffer
 */
export const readFiles = async fileResources => {
  const promises = fileResources.map(fileResource => readFile(fileResource));
  const files = await Promise.all(promises);
  return files;
};

/**
 * Create a collection of objects, having a CSV for each Workbook Sheet
 *
 * @param {Object[]} files An array of objects
 * @param {string} files[].name Original name of the file
 * @param {ArrayBuffer} files[].content File content as ArrayBuffer
 *
 * @returns {Object[]} Array of object for each file, woth csv for each sheet.
 */
export const buildData = (files = []) =>
  files.map(({ content, filename }) => {
    const workbook = getWorkbook(content);
    const { SheetNames, Sheets } = workbook;

    const csvFiles = SheetNames.map(sheetname => ({
      sheetname,
      csv: XLSX.utils.sheet_to_csv(Sheets[sheetname], { strip: true }),
    }));

    return {
      content: csvFiles,
      filename,
    };
  });

/**
 * Create a zip file from a specific structure
 *
 * @param {Object[]} data
 * @param {string} data[].name
 * @param {Object[]} data[].content
 * @param {string} data[].content.filename
 * @param {string} data[].content.csv
 */
export const buildZip = async (data = []) => {
  const zip = new JSZip();
  data.forEach(({ filename, content }) => {
    content.forEach(({ sheetname, csv }) => {
      zip.file(`${removeExt(filename)}/${slug(sheetname)}.csv`, csv);
    });
  });

  const base64 = await zip.generateAsync({ type: 'base64' });
  return `data:application/zip;base64,${base64}`;
};
