import React from 'react';
import { formatRupiah, formatDate, parseNumber } from '../../utils/formatters';

export const PageSettlement = ({ data }) => {
  const {
    isBusiness = true,
    isNonBusiness = false,
    name = '',
    tanggal = '',
    deptDiv = '',
    expenseType = '',
    cashAdvanceTaken = 0,
    appliedRate = 1,
    otherCurrency = {
      name: '',
      cashAdvance: 0,
      totalExpenses: 0,
      appliedRate: 0
    },
    items = [],
    signatures = {
      preparedBy: { name: '( user)', sign: null },
      checkedByRPM: { name: 'RPM', sign: null },
      checkedBySeptya: { name: 'Septya', sign: null },
      approvedBy: { name: 'Pimpinan', sign: null }
    }
  } = data || {};

  // Compute item totals
  const totalExpenses = (items || []).reduce((sum, it) => sum + parseNumber(it.amount), 0);
  const numCashAdvance = parseNumber(cashAdvanceTaken);
  const balanceC = numCashAdvance - totalExpenses;
  const balanceRupiahEq = balanceC * (parseNumber(appliedRate) || 1);

  // Pad items to at least 11 rows so table fills the template perfectly
  const minRows = 11;
  const displayItems = [...(items || [])];
  while (displayItems.length < minRows) {
    displayItems.push({ date: '', description: '', amount: '' });
  }

  return (
    <div className="a4-page bg-white text-black text-[12px] flex flex-col justify-between select-none relative box-border" style={{ minHeight: '297mm', padding: '14mm 16mm' }}>
      <div>
        {/* Header */}
        <div className="flex justify-between items-end pb-1">
          <div className="text-[17px] font-semibold tracking-tight text-[#2563eb]">
            PT. Infiniti Matrix Teknology
          </div>
          <div className="text-[20px] font-normal tracking-wide text-[#2563eb]">
            Settlement
          </div>
        </div>
        <div className="h-[3px] bg-[#2563eb] w-full mb-3"></div>

        {/* Business Checkboxes */}
        <div className="flex items-center gap-6 mb-2 text-[12px]">
          <label className="flex items-center gap-1.5 cursor-default font-medium">
            <span className="inline-flex items-center justify-center w-4 h-4 border border-black text-[11px] font-bold">
              {isBusiness ? 'X' : ''}
            </span>
            <span>Business</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-default font-medium">
            <span className="inline-flex items-center justify-center w-4 h-4 border border-black text-[11px] font-bold">
              {isNonBusiness ? 'X' : ''}
            </span>
            <span>Non-Business</span>
          </label>
        </div>

        {/* Top Info Grid */}
        <div className="grid grid-cols-[1fr_200px] gap-2 mb-2">
          {/* Row 1 Left: Name */}
          <div className="border border-black px-2 py-1 flex items-center">
            <span className="font-medium w-16">Name:</span>
            <span className="font-medium text-slate-900">{name}</span>
          </div>
          {/* Row 1 Right: Tanggal */}
          <div className="border border-black px-2 py-1 flex items-center">
            <span className="font-medium w-16">Tanggal :</span>
            <span>{formatDate(tanggal, 'short') || tanggal}</span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_200px] gap-2 mb-2">
          {/* Row 2 Left: Dept/Div */}
          <div className="border border-black px-2 py-1 flex items-center">
            <span className="font-medium w-16">Dept/Div:</span>
            <span>{deptDiv}</span>
          </div>
          {/* Row 2 Right: Expense Type */}
          <div className="border border-black px-2 py-1 flex items-center">
            <span className="font-medium w-24">Expense Type:</span>
            <span>{expenseType}</span>
          </div>
        </div>

        {/* Currency & Balance Summary Table */}
        <table className="w-full border-collapse border border-black mb-1.5 text-[10.5px]">
          <thead>
            <tr className="border-b border-black text-center bg-slate-50">
              <th className="border-r border-black p-1 font-medium w-[12%]">Currency</th>
              <th className="border-r border-black p-1 font-medium w-[18%]">Cash Advance Taken<br/>(A)</th>
              <th className="border-r border-black p-1 font-medium w-[18%]">Total expenses<br/>(B)</th>
              <th className="border-r border-black p-1 font-medium w-[20%]">Balance Due to /(from<br/>Company (C= A-B)</th>
              <th className="border-r border-black p-1 font-medium w-[14%]">Applied Rate<br/>(D)</th>
              <th className="p-1 font-medium w-[18%]">Balance Rupiah<br/>Equivalent (C x D)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black text-right">
              <td className="border-r border-black p-1 text-left font-medium">Rupiah</td>
              <td className="border-r border-black p-1">{numCashAdvance > 0 ? formatRupiah(numCashAdvance) : '0'}</td>
              <td className="border-r border-black p-1">{totalExpenses > 0 ? formatRupiah(totalExpenses) : '0'}</td>
              <td className="border-r border-black p-1 font-medium">{formatRupiah(balanceC)}</td>
              <td className="border-r border-black p-1 text-center">{appliedRate || '1'}</td>
              <td className="p-1 font-semibold">{formatRupiah(balanceRupiahEq)}</td>
            </tr>
            <tr className="border-b border-black text-right">
              <td className="border-r border-black p-1 text-left font-medium">Other: {otherCurrency?.name || ''}</td>
              <td className="border-r border-black p-1">{otherCurrency?.cashAdvance ? formatRupiah(otherCurrency.cashAdvance) : ''}</td>
              <td className="border-r border-black p-1">{otherCurrency?.totalExpenses ? formatRupiah(otherCurrency.totalExpenses) : ''}</td>
              <td className="border-r border-black p-1">{otherCurrency?.cashAdvance || otherCurrency?.totalExpenses ? formatRupiah((otherCurrency?.cashAdvance || 0) - (otherCurrency?.totalExpenses || 0)) : ''}</td>
              <td className="border-r border-black p-1 text-center">{otherCurrency?.appliedRate || ''}</td>
              <td className="p-1 font-semibold">0</td>
            </tr>
            <tr className="font-semibold">
              <td colSpan={5} className="border-r border-black p-1 text-center">
                Total Balance Due to/(from) Company
              </td>
              <td className="p-1 text-right">{formatRupiah(balanceRupiahEq)}</td>
            </tr>
          </tbody>
        </table>

        {/* Small Instruction text */}
        <p className="text-[8.5px] leading-tight text-slate-600 mb-1.5 italic">
          Detail of expense: Please ensure all receipts and vouchers are attached including fiscal tickets. Obtain company's doctor approval for medical. If entertaining others indicate person entertained. Use separate paper for additional details.
        </p>

        {/* Detail Expenses Table */}
        <table className="w-full border-collapse border border-black text-[11px]">
          <thead>
            <tr className="border-b border-black text-center bg-slate-50">
              <th className="border-r border-black p-1 font-medium w-[16%]">Date</th>
              <th className="border-r border-black p-1 font-medium w-[58%]">Description</th>
              <th className="p-1 font-medium w-[26%]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((item, idx) => (
              <tr key={idx} className="border-b border-black h-[22px]">
                <td className="border-r border-black px-1.5 py-0.5 text-center whitespace-nowrap">
                  {item.date ? formatDate(item.date, 'short') : ''}
                </td>
                <td className="border-r border-black px-2 py-0.5 text-left">
                  {item.description || ''}
                </td>
                <td className="px-2 py-0.5 text-right font-medium">
                  {item.amount ? formatRupiah(item.amount) : ''}
                </td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="border-t border-black font-semibold h-[24px]">
              <td colSpan={2} className="border-r border-black px-4 text-center">
                Total
              </td>
              <td className="px-2 text-right">
                <span className="float-left font-normal">Rp</span>
                <span>{formatRupiah(totalExpenses)}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Signature Section */}
      <div className="grid grid-cols-[3fr_1.3fr] gap-6 mt-3 text-[11px]">
        {/* Left Signature Box (3 people: Prepared, Checked, Checked) */}
        <div className="border border-black">
          <div className="grid grid-cols-3 divide-x border-b border-black text-center py-1 font-medium bg-slate-50">
            <div>Prepared by</div>
            <div>Checked by</div>
            <div>Checked by</div>
          </div>
          {/* Signatures Image Row */}
          <div className="grid grid-cols-3 divide-x h-[68px]">
            {/* Prepared */}
            <div className="flex items-center justify-center p-1">
              {signatures?.preparedBy?.sign ? (
                <img src={signatures.preparedBy.sign} alt="User Sign" className="max-h-[55px] max-w-[85px] object-contain" />
              ) : null}
            </div>
            {/* RPM */}
            <div className="flex items-center justify-center p-1">
              {signatures?.checkedByRPM?.sign ? (
                <img src={signatures.checkedByRPM.sign} alt="RPM Sign" className="max-h-[55px] max-w-[85px] object-contain" />
              ) : null}
            </div>
            {/* Septya */}
            <div className="flex items-center justify-center p-1">
              {signatures?.checkedBySeptya?.sign ? (
                <img src={signatures.checkedBySeptya.sign} alt="Septya Sign" className="max-h-[55px] max-w-[85px] object-contain" />
              ) : null}
            </div>
          </div>
          {/* Names Row */}
          <div className="grid grid-cols-3 divide-x border-t border-black text-center py-1 font-medium">
            <div>{signatures?.preparedBy?.name || '( user)'}</div>
            <div>{signatures?.checkedByRPM?.name || 'RPM'}</div>
            <div>{signatures?.checkedBySeptya?.name || 'Septya'}</div>
          </div>
          {/* Date Row - Otomatis dari Tanggal Settlement */}
          <div className="grid grid-cols-3 divide-x border-t border-black text-center text-[10px] py-0.5 bg-slate-50 font-normal">
            <div>Date: {formatDate(tanggal, 'short') || '-'}</div>
            <div>Date: {formatDate(tanggal, 'short') || '-'}</div>
            <div>Date: {formatDate(tanggal, 'short') || '-'}</div>
          </div>
        </div>

        {/* Right Signature Box (Approved by Pimpinan) */}
        <div className="border border-black flex flex-col justify-between">
          <div className="border-b border-black text-center py-1 font-medium bg-slate-50">
            Approved by
          </div>
          {/* Signatures Image Row */}
          <div className="h-[68px] flex items-center justify-center p-1">
            {signatures?.approvedBy?.sign ? (
              <img src={signatures.approvedBy.sign} alt="Pimpinan Sign" className="max-h-[55px] max-w-[100px] object-contain" />
            ) : null}
          </div>
          {/* Name Row */}
          <div className="border-t border-black text-center py-1 font-medium">
            {signatures?.approvedBy?.name || 'Pimpinan'}
          </div>
          {/* Date Row - Otomatis dari Tanggal Settlement */}
          <div className="border-t border-black text-center text-[10px] py-0.5 bg-slate-50 font-normal">
            Date: {formatDate(tanggal, 'short') || '-'}
          </div>
        </div>
      </div>
    </div>
  );
};
