/**
 * It takes a data path and returns the data at that path
 * @param siteData - The site data object.
 * @param dataPath - The path to the data file.
 * @returns The data from the dataPath.
 */
import _ from 'lodash';

/**
 * Get the page at the provided `filePath`.
 *
 * @param {Array} pages Array of page objects. All pages must have 'url' field.
 * @param {string} filePath The file path to find the page by
 * @return {Object}
 */
export default function getPageByFilePath(pages, filePath) {
    filePath = _.trim(filePath, '.md');
    const urlPath = filePath.replace(/^\/?src\/pages\//, '');

    return _.find(pages, page => {
        const pageUrlPath = _.trim(_.get(page, 'url'), '/');
        return urlPath === pageUrlPath;
    });
}