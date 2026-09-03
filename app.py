import streamlit as st
import streamlit.components.v1 as components
import os
import re

st.set_page_config(
    page_title="Gulamgous Khan | Full Stack AI/ML Engineer",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit default header, footer, and margins
st.markdown("""
<style>
    #MainMenu {visibility: hidden; display: none !important;}
    footer {visibility: hidden; display: none !important;}
    header {visibility: hidden; display: none !important;}
    [data-testid="stToolbar"] {visibility: hidden; display: none !important;}
    [data-testid="stDecoration"] {visibility: hidden; display: none !important;}
    [data-testid="stStatusWidget"] {visibility: hidden; display: none !important;}
    [data-testid="stHeader"] {display: none !important;}
    .main .block-container {
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
    }
    div[data-testid="stVerticalBlock"] {
        gap: 0 !important;
    }
    iframe {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw !important;
        height: 100vh !important;
        border: none !important;
    }
</style>
""", unsafe_allow_html=True)

def load_portfolio():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(base_dir, "index.html")
    css_path = os.path.join(base_dir, "style.css")
    js_path = os.path.join(base_dir, "script.js")
    
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()
        
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()
        
    with open(js_path, "r", encoding="utf-8") as f:
        js = f.read()
        
    # Inline CSS & JS for seamless standalone execution
    html = re.sub(r'<link\s+rel="stylesheet"\s+href="style\.css"[^>]*>', f'<style>{css}</style>', html)
    html = re.sub(r'<script\s+src="script\.js"[^>]*></script>', f'<script>{js}</script>', html)
    
    return html

bundled_html = load_portfolio()
components.html(bundled_html, height=1000, scrolling=True)
