<template>
    <codemirror v-model="code" 
                :options="cmOption"
                @input="onChange"></codemirror>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/keymap/sublime'

export default { 
    components: { 
        codemirror
    },
    data() {
        return {
            code: 'const A = 10',
            cmOption: { 
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                foldGutter: true,
                styleSelectedText: true,
                mode: 'text/javascript',
                keyMap: "sublime",
                matchBrackets: true,
                showCursorWhenSelecting: true,
                theme: "monokai",
                extraKeys: { "Ctrl": "autocomplete" },
                hintOptions:{
                  completeSingle: false
                }
            }
        }
    },
    methods: {
        onChange: function(cm) {
            console.log("updated", cm);
        }
    }
}
</script>