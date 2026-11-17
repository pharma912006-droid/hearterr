# Regenerate data/data.js after editing any JSON file under data/
import json,glob,os
os.chdir(os.path.join(os.path.dirname(__file__),'..'))
d={f[5:]:json.load(open(f,encoding='utf-8')) for f in sorted(glob.glob('data/**/*.json',recursive=True))}
open('data/data.js','w',encoding='utf-8').write('window.__DATA='+json.dumps(d,ensure_ascii=False)+';\n')
print('data/data.js written with',len(d),'files')
