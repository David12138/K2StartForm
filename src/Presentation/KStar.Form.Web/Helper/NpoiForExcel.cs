using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace KStar.Form.Web.Helper
{
    /// <summary>
    /// NpoiForExcel
    /// </summary>
    public class NpoiForExcel
    {
        /// <summary>
        ///     The exce l 03_ max row.
        /// </summary>
        private readonly int EXCEL03_MaxRow = 65535;
        /// <summary>
        ///The full filename
        /// </summary>
        private readonly string _importFilename = string.Empty;
        /// <summary>
        ///     The book.
        /// </summary>
        private readonly IWorkbook _book;

        private string rowIndexs;

        /// <summary>
        /// RowIndexs
        /// </summary>
        public string RowIndexs
        {
            set { rowIndexs = value; }
            get
            {
                if (rowIndexs == null) return "1";
                return rowIndexs;
            }
        }


        /// <summary>
        /// NpoiForExcel
        /// </summary>
        /// <param name="importFilename"></param>
        public NpoiForExcel(string importFilename)
        {
            this._importFilename = importFilename;
            FileStream strm = new FileStream(_importFilename, FileMode.Open, FileAccess.Read);
            _book = new XSSFWorkbook(strm);
        }
        /// <summary>
        /// 将数据导出到Excel
        /// </summary>
        /// <param name="dt">
        /// DataTable数据
        /// </param>
        /// <param name="sheetName">
        /// 导出的Excel中数据所属页签名称
        /// </param>
        /// <param name="showColumnName">
        /// showColumnName
        /// </param>
        /// <returns>
        /// 导出的Excel文件流 用于输出到客户端
        /// </returns>
        public byte[] DataTable2Excel(DataTable dt, string sheetName, bool showColumnName)
        {
            if (dt.Rows.Count < EXCEL03_MaxRow)
            {
                DataWrite2Sheet(dt, 0, dt.Rows.Count - 1, _book, sheetName, showColumnName);
            }
            else
            {
                int page = dt.Rows.Count / EXCEL03_MaxRow;
                for (int i = 0; i < page; i++)
                {
                    int start = i * EXCEL03_MaxRow;
                    int end = (i * EXCEL03_MaxRow) + EXCEL03_MaxRow - 1;
                    DataWrite2Sheet(dt, start, end, _book, sheetName + i.ToString(), showColumnName);
                }

                int lastPageItemCount = dt.Rows.Count % EXCEL03_MaxRow;
                DataWrite2Sheet(
                    dt, dt.Rows.Count - lastPageItemCount, lastPageItemCount, _book, sheetName + page.ToString(), showColumnName);
            }

            MemoryStream ms = new MemoryStream();
            _book.Write(ms);
            return ms.ToArray();
        }
        /// <summary>
        /// 往Excel第一页中写数据,默认第一页
        /// </summary>
        /// <param name="dt">
        /// 要导入的数据
        /// </param>
        /// <param name="startRow">
        /// 数据开始读取的行
        /// </param>
        /// <param name="endRow">
        /// 数据结束读取的行
        /// </param>
        /// <param name="book">
        /// </param>
        /// <param name="sheetName">
        /// Excel页签名称
        /// </param>
        /// <param name="showColumnName">showColumnName
        /// </param>
        private void DataWrite2Sheet(DataTable dt, int startRow, int endRow, IWorkbook book, string sheetName, bool showColumnName)
        {

            ISheet sheet = book.GetSheetAt(0);
            if (!string.IsNullOrEmpty(sheetName))
            {
                sheet.Workbook.SetSheetName(0, sheetName);
            }

            IFont font;
            try
            {
                font = new XSSFFont();
                font.FontName = "黑体";
                font.FontHeightInPoints = 14;
                font.Boldweight = (short)FontBoldWeight.Bold;

            }
            catch (Exception)
            {
                font = book.CreateFont();
                font.Boldweight = (short)FontBoldWeight.Bold;
                font.FontName = "黑体";
                font.FontHeightInPoints = 14;
            }

            if (showColumnName)
            {
                IRow header = sheet.CreateRow(0);
                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    ICell cell = header.CreateCell(i);
                    cell.CellStyle.Alignment = HorizontalAlignment.Center;
                    cell.CellStyle.SetFont(font);
                    string val = dt.Columns[i].Caption ?? dt.Columns[i].ColumnName;
                    cell.SetCellValue(val);
                }
            }

            int rowIndex = int.Parse(RowIndexs);

            for (int i = startRow; i <= endRow; i++)
            {
                DataRow dtRow = dt.Rows[i];
                //IRow oldRow = sheet.GetRow(i);
                //if (oldRow == null)
                //{

                //}
                IRow excelRow = sheet.CreateRow(rowIndex++);
                for (int j = 0; j < dtRow.ItemArray.Length; j++)
                {
                    string cellValue = string.Empty;
                    if (string.IsNullOrEmpty(dtRow[j].ToString()))
                    {
                        cellValue = null;
                    }
                    else
                    {
                        cellValue = dtRow[j].ToString();
                    }

                    excelRow.CreateCell(j).SetCellValue(cellValue);
                }
            }
        }
    }

    /// <summary>
    /// 重写NPOI的MemoryStream
    /// </summary>
    public class NpoiMemoryStream : MemoryStream
    {
        /// <summary>
        /// NpoiMemoryStream
        /// </summary>
        public NpoiMemoryStream()
        {
            AllowClose = true;
        }

        /// <summary>
        /// AllowClose
        /// </summary>
        public bool AllowClose { get; set; }

        /// <summary>
        /// Close方法
        /// </summary>
        public override void Close()
        {
            if (AllowClose)
                base.Close();
        }
    }
}