# 공유용 Claude 아티팩트 사본 만들기
#   python3 tools/build-artifact.py   →   dist/artifact/
#
# 원본(Portfolio.web)은 그대로 두고, 아티팩트 환경 제약에 맞게 가공한 사본만 만든다.
#  - 주소창 쿼리(?p=, ?tag=, ?more=)를 쓸 수 없어서 해시(#deflare, #graphic, #contact)로 바꿈
#  - 폴더 주소(about/)를 파일 주소(about/index.html)로 바꿈
#  - 외부 폰트 파일은 차단되므로 @font-face에서 url()을 빼고 기기 폰트(local)만 남김
#  - 첫 페이지는 아티팩트가 <html>/<head>/<body>를 감싸주므로 그 태그를 걷어냄
import os
import re
import shutil

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
OUT = os.path.join(ROOT, "dist", "artifact")

PAGES = ["index.html", "about/index.html", "work/index.html"]
FILES = ["fonts.css", "styles.css", "more.css", "about.css", "work.css",
         "theme.js", "projects.js", "main.js", "work.js", "more.js", "typeset.js", "reveal.js"]
DIRS = ["assets"]

LINKS = [
    ('href="../about/?more=contact"', 'href="../about/index.html#contact"'),
    ('href="about/?more=contact"', 'href="about/index.html#contact"'),
    ('href="../about/"', 'href="../about/index.html"'),
    ('href="about/"', 'href="about/index.html"'),
    ('href="../"', 'href="../index.html"'),
    ('href="./"', 'href="index.html"'),
]
HASH_FLAG = '<script>window.HASH_ROUTES = true;</script>\n'
ENTRY_TITLE = "530n9h33"


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def page(rel):
    html = read(os.path.join(ROOT, rel))
    for a, b in LINKS:
        html = html.replace(a, b)
    # 다른 스크립트보다 먼저 해시 주소 모드를 켬
    html = html.replace("<script>", HASH_FLAG + "  <script>", 1)
    if rel == "index.html":
        body_class = re.search(r'<body class="([^"]*)"', html).group(1)
        html = re.sub(r"<!DOCTYPE html>\s*", "", html, flags=re.I)
        html = re.sub(r"</?html[^>]*>\s*", "", html)
        html = re.sub(r"</?head>\s*", "", html)
        html = re.sub(r"<meta [^>]*>\s*", "", html)          # charset·viewport는 아티팩트가 넣어줌
        add = "document.body.classList.add(%r)" % body_class
        html = re.sub(r"<body[^>]*>",
                      "<script>document.body ? %s : document.addEventListener('DOMContentLoaded', function () { %s; });</script>" % (add, add),
                      html)
        html = html.replace("</body>", "")
        html = re.sub(r"<title>.*?</title>", "<title>%s</title>" % ENTRY_TITLE, html)
    return html


def fonts_local_only(css):
    def fix(m):
        face = m.group(0)
        srcs = [s.strip() for s in re.search(r"src:\s*(.*?);", face, re.S).group(1).split(",")]
        local = [s for s in srcs if s.startswith("local(")]
        if not local:
            return ""                                         # 기기 폰트도 없으면 선언 자체를 뺌
        return re.sub(r"src:\s*.*?;", "src: " + ", ".join(local) + ";", face, flags=re.S)
    return re.sub(r"@font-face\s*{.*?}", fix, css, flags=re.S)


def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    for rel in PAGES:
        write(os.path.join(OUT, rel), page(rel))
    for rel in FILES:
        text = read(os.path.join(ROOT, rel))
        if rel == "fonts.css":
            text = fonts_local_only(text)
        write(os.path.join(OUT, rel), text)
    for d in DIRS:
        shutil.copytree(os.path.join(ROOT, d), os.path.join(OUT, d))
    count = sum(len(files) for _, _, files in os.walk(OUT))
    print("built", OUT, count, "files")


if __name__ == "__main__":
    main()
