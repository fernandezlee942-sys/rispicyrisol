import './css/ErrorPage.css'

export default function ErrorPage({ code, emoji, title, text, children }) {
    return (
        <section className="error-page">
            <div className="error-card">
                <span className="error-emoji">{emoji}</span>
                <h1 className="error-code">{code}</h1>
                <h2>{title}</h2>
                <p>{text}</p>
                <div className="error-actions">{children}</div>
            </div>
        </section>
    )
}