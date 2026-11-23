import { createPortal } from 'react-dom'
import Receipt from './Receipt'
import './css/PaymentModal.css'

export default function ReceiptModal({ sale, onClose, title = 'Struk Transaksi', closeLabel = 'Tutup' }) {
    return (
        <>
            <div className="pay-overlay">
                <div className="pay-modal">
                    <h3 className="pay-title">{title}</h3>
                    <div className="receipt-preview">
                        <Receipt sale={sale} />
                    </div>
                    <div className="pay-actions">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>{closeLabel}</button>
                        <button type="button" className="btn btn-primary" onClick={() => window.print()}>
                            🖨️ Cetak Struk
                        </button>
                    </div>
                </div>
            </div>
            {/* salinan struk untuk dicetak (tampil hanya saat print) */}
            {createPortal(
                <div className="print-only"><Receipt sale={sale} /></div>,
                document.body
            )}
        </>
    )
}