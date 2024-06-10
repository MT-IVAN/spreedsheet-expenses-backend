const { service } = require('./google-sheet-config')

/**
 * Gets cell values from a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The sheet range.
 * @return {obj} spreadsheet information
 */

async function getValues({
  spreadsheetId,
  range,
  upToDay,
  month: monthSearch,
}) {
  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId,
      range,
    })
    const numRows = result.data.values ? result.data.values.length : 0
    console.log(`${numRows} rows retrieved.`)
    const formattedTable = formatTable(result.data.values)
    const months = [
      ['enero', 31],
      ['febrero', 29],
      ['marzo', 31],
      ['april', 30],
      ['mayo', 31],
      ['junio', 30],
      ['julio', 31],
      ['agosto', 31],
      ['september', 30],
      ['octubre', 31],
      ['noviembre', 30],
      ['diciembre', 31],
    ]
    const monthIndex = months.findIndex((month) => month[0] === monthSearch)
    if (+upToDay === 31) {
      upToDay = months[monthIndex][1]
    }
    const dateToCompare = new Date('2024', monthIndex, upToDay)

    const fitlerByWeek = formattedTable.filter(({ fecha }) => {
      return new Date(fecha).getTime() <= dateToCompare.getTime()
    })
    return fitlerByWeek
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err
  }
}

function formatTable(rows) {
  return rows.map((row) => {
    let [fecha, description, comments, budgetId, target, from, value] = row

    return {
      fecha,
      description,
      comments,
      budgetId,
      target,
      from,
      value: +value?.replaceAll(',', '') || 0,
    }
  })
}

async function appendValues(
  spreadsheetId,
  range,
  values,
  valueInputOption = 'USER_ENTERED'
) {
  const resource = {
    values: [values],
  }
  try {
    const result = await service.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    })
    console.log(`${result.data.updates.updatedCells} cells appended.`)
    return result
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err
  }
}

async function getTotalPerDayByMonth({ month }) {
  const values = await getValues({
    spreadsheetId: '1Yk24_5hAKPtgJSd3Srtfsia5x2uLF-BKCADB9n74ODk',
    range: `${month}!A12:G100`,
    upToDay: 31,
    month,
  })
  const groupedByDate = values.reduce((acc, expense) => {
    const fecha = expense?.fecha?.split('-')[1]
    //check undefined
    acc[fecha] ??= 0
    acc[fecha] += expense.value
    return acc
  }, {})
  return groupedByDate
}

module.exports = {
  getValues,
  appendValues,
  getTotalPerDayByMonth,
}
