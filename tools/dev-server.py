# 로컬 미리보기 서버: 매 요청마다 최신 파일을 보내도록 캐시를 끔
# (python -m http.server 는 캐시 헤더가 없어 브라우저가 예전 CSS/JS를 계속 쓰는 문제가 있음)
#   python3 tools/dev-server.py [port]
import http.server
import os
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4321
    os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
    http.server.ThreadingHTTPServer(("", port), NoCacheHandler).serve_forever()
