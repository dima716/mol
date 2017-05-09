declare namespace $ {
    class $mol_dict<Key, Value> {
        size: number;
        get(key: Key): Value;
        set(key: Key, value: Value): this;
        delete(key: Key): void;
        has(key: Key): boolean;
        clear(): void;
        keys(): Key[];
        values(): Value[];
        entries(): [Key, Value][];
        forEach(handler: (value: Value, key: Key) => void): void;
    }
    class $mol_dict_shim<Key, Value> implements $mol_dict<Key, Value> {
        _keys: {
            [index: string]: Key[];
        };
        _values: {
            [index: string]: Value[];
        };
        size: number;
        set(key: Key, value: Value): this;
        get(key: Key): Value;
        has(key: Key): boolean;
        delete(key: Key): void;
        forEach(handle: (val: Value, key: Key) => void): void;
        keys(): Key[];
        values(): Value[];
        entries(): [Key, Value][];
        clear(): void;
    }
}
interface Function {
    name: string;
}
declare namespace $ {
    var $mol_func_name_dict: $mol_dict<Function, string>;
    function $mol_func_name(func: Function): string;
}
declare namespace $ {
    function $mol_log(path: string, values: any[]): void;
    namespace $mol_log {
        function filter(next?: string): string;
    }
}
declare namespace $ {
    class $mol_object {
        Class(): any;
        static toString(): string;
        private 'object_owner()';
        object_owner(next?: Object): Object;
        private 'object_field()';
        object_field(next?: string): string;
        toString(): string;
        toJSON(): string;
        setup(script: (obj: this) => void): this;
        'destroyed()': boolean;
        destroyed(next?: boolean): boolean;
        log(values: any[]): void;
    }
}
declare namespace $ {
    class $mol_window extends $mol_object {
        static size(next?: {
            width: number;
            height: number;
        }): {
            width: number;
            height: number;
        };
    }
}
declare namespace $ {
    class $mol_set<Value> {
        size: number;
        add(key: Value): this;
        delete(key: Value): void;
        has(key: Value): boolean;
        clear(): void;
        keys(): Value[];
        values(): Value[];
        entries(): [Value, Value][];
        forEach(handler: (key: Value, value: Value) => void): void;
    }
    class $mol_set_shim<Value> implements $mol_set<Value> {
        _index: {
            [index: string]: Value[];
        };
        size: number;
        add(value: Value): this;
        has(value: Value): boolean;
        delete(value: Value): void;
        forEach(handle: (val: Value, key: Value) => void): void;
        keys(): Value[];
        values(): Value[];
        entries(): [Value, Value][];
        clear(): void;
    }
}
declare namespace $ {
    class $mol_defer extends $mol_object {
        run: () => void;
        constructor(run: () => void);
        destroyed(next?: boolean): boolean;
        static all: $mol_defer[];
        static timer: number;
        static scheduleNative: (handler: () => void) => number;
        static schedule(): void;
        static unschedule(): void;
        static add(defer: $mol_defer): void;
        static drop(defer: $mol_defer): void;
        static run(): void;
    }
}
declare namespace $ {
    var $mol_state_stack: $mol_dict<string, any>;
}
declare var Proxy: any;
declare namespace $ {
    enum $mol_atom_status {
        obsolete,
        checking,
        pulling,
        actual,
    }
    class $mol_atom<Value> extends $mol_object {
        masters: $mol_set<$mol_atom<any>>;
        slaves: $mol_set<$mol_atom<any>>;
        status: $mol_atom_status;
        autoFresh: boolean;
        handler: (next?: Value | Error, force?: $mol_atom_force) => Value;
        host: {
            [key: string]: any;
        };
        field: string;
        constructor(host: any, handler: (next?: Value | Error, force?: $mol_atom_force) => Value, field?: string);
        destroyed(next?: boolean): boolean;
        unlink(): void;
        toString(): string;
        get(force?: $mol_atom_force): Value;
        actualize(force?: $mol_atom_force): void;
        pull(force?: $mol_atom_force): any;
        _next: Value | Error;
        set(next: Value): Value;
        normalize(next: Value, prev: Value | Error): Value;
        push(next_raw: Value | Error): any;
        obsolete_slaves(): void;
        check_slaves(): void;
        check(): void;
        obsolete(): Value;
        lead(slave: $mol_atom<any>): void;
        dislead(slave: $mol_atom<any>): void;
        obey(master: $mol_atom<any>): void;
        disobey(master: $mol_atom<any>): void;
        disobey_all(): void;
        value(next?: Value, force?: $mol_atom_force): any;
        static stack: $mol_atom<any>[];
        static updating: $mol_atom<any>[];
        static reaping: $mol_set<$mol_atom<any>>;
        static scheduled: boolean;
        static actualize(atom: $mol_atom<any>): void;
        static reap(atom: $mol_atom<any>): void;
        static unreap(atom: $mol_atom<any>): void;
        static schedule(): void;
        static sync(): void;
    }
    class $mol_atom_wait extends Error {
        message: string;
        name: string;
        constructor(message?: string);
    }
    class $mol_atom_force extends Object {
        $mol_atom_force: boolean;
        static $mol_atom_force: boolean;
    }
    function $mol_atom_task<Value>(host: any, handler: () => Value): $mol_atom<any>;
}
declare namespace $ {
    function $mol_mem<Host, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(next?: Value, force?: $mol_atom_force) => Value>) => void;
    function $mol_mem_key<Host, Key, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(key: Key, next?: Value, force?: $mol_atom_force) => Value>) => void;
}
declare var Proxy: any;
declare var require: (path: string) => any;
declare var $node: any;
declare namespace $ {
}
declare namespace $ {
    var $mol_dom_context: Window & {
        Node: typeof Node;
        Element: typeof Element;
        HTMLElement: typeof HTMLElement;
        XMLHttpRequest: typeof XMLHttpRequest;
    };
}
declare namespace $ {
    interface $mol_dom_render_config {
        childNodes?: NodeList | Array<Node | string | number | boolean | {
            render: () => Node;
        }>;
        attributes?: {
            [key: string]: string | number | boolean;
        };
        style?: {
            [key: string]: string | number;
        };
        events?: {
            [key: string]: (event: Event) => any;
        };
        events_async?: {
            [key: string]: (event: Event) => any;
        };
        [key: string]: any;
    }
    function $mol_dom_render(el: Element, config: $mol_dom_make_config): Element;
    function $mol_dom_render_childNodes(el: Element, childNodes?: NodeList | Array<Node | string | number | boolean | {
        render: () => Node;
    }>): void;
    function $mol_dom_render_attributes(el: Element, attrs?: {
        [key: string]: string | number | boolean;
    }): void;
    function $mol_dom_render_style(el: Element, styles?: {
        [key: string]: string | number;
    }): void;
    function $mol_dom_render_event(el: Element, events?: {
        [key: string]: (event: Event) => any;
    }): void;
    function $mol_dom_render_event_async(el: Element, events?: {
        [key: string]: (event: Event) => any;
    }): void;
}
declare namespace $ {
    interface $mol_dom_make_config extends $mol_dom_render_config {
        id?: string;
        localName?: string;
        namespaceURI?: string;
    }
    function $mol_dom_make(config: $mol_dom_make_config): Element;
}
declare class WeakMap<Key, Value> {
    get(key: Key): Value;
    set(key: Key, value: Value): this;
}
declare namespace $ {
    class $mol_view_dom extends $mol_object {
        static nodes: WeakMap<$mol_view, Element>;
        static node(view: $mol_view): Element;
        static mount(view: $mol_view, node: Element): Element;
    }
}
declare namespace $ {
    function $mol_deprecated<Host, Method extends Function>(message: string): (host: Host, field: string, descr: TypedPropertyDescriptor<Method>) => void;
}
declare namespace $ {
    let $mol_view_context: $mol_view_context;
    interface $mol_view_context {
        $mol_view_visible_width(): number;
        $mol_view_visible_height(): number;
        $mol_view_state_key(suffix: string): string;
    }
    class $mol_view extends $mol_object {
        static Root(id: number): $mol_view;
        title(): string;
        focused(next?: boolean): boolean;
        context(next?: $mol_view_context): $mol_view_context;
        context_sub(): $mol_view_context;
        state_key(suffix?: string): string;
        dom_name(): string;
        dom_name_space(): string;
        sub(): (string | number | boolean | Node | $mol_view)[];
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
        minimal_width(): number;
        minimal_height(): number;
        'view_classes()': Function[];
        view_classes(): Function[];
        dom_node(): Element;
        dom_tree(): Element;
        render(): Element;
        attr_static(): {
            [key: string]: string | number | boolean;
        };
        attr(): {
            [key: string]: string | number | boolean;
        };
        style(): {
            [key: string]: string | number;
        };
        field(): {
            [key: string]: any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        event_async(): {
            [key: string]: (event: Event) => void;
        };
        'event_wrapped()': {
            [name: string]: (event?: Event) => any;
        };
        event_wrapped(): {
            [key: string]: (event: Event) => void;
        };
        'locale_contexts()': string[];
        locale_contexts(): string[];
        plugins(): $mol_view[];
    }
}
declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], force?: $mol_atom_force): Element[];
        static position(...diff: any[]): any;
        static onFocus(event: FocusEvent): void;
        static onBlur(event: FocusEvent): void;
    }
}
declare namespace $ {
    class $mol_meter extends $mol_view {
        width(val?: any, force?: $mol_atom_force): any;
        height(val?: any, force?: $mol_atom_force): any;
        left(val?: any, force?: $mol_atom_force): any;
        right(val?: any, force?: $mol_atom_force): any;
        bottom(val?: any, force?: $mol_atom_force): any;
        top(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$mol {
    class $mol_meter extends $.$mol_meter {
        _request_id: number;
        defer_task(): void;
        dom_node(): Element;
        update(): void;
        destroyed(next?: boolean): boolean;
        width(val?: any): any;
        height(val?: any): any;
    }
}
declare namespace $ {
    class $mol_ghost extends $mol_view {
        Sub(): $mol_view;
    }
}
declare namespace $.$mol {
    class $mol_ghost extends $.$mol_ghost {
        dom_node(): Element;
        render(): Element;
    }
}
declare namespace $ {
    class $mol_book extends $mol_view {
        pages_extended(): any[];
        sub(): any[];
        pages(): any[];
        width(): any;
        Meter(): $mol_meter;
        plugins(): any[];
        page(index: any): any;
        page_visible(index: any): boolean;
        Page(index: any): $mol_book_page;
    }
}
declare namespace $ {
    class $mol_book_placeholder extends $mol_view {
        minimal_width(): number;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_book_page extends $mol_ghost {
        visible(): boolean;
        attr(): {
            "mol_book_page_visible": boolean;
        };
    }
}
declare namespace $.$mol {
    class $mol_book extends $.$mol_book {
        pages_filtered(): any[];
        break_point(): number;
        page(index: number): any;
        page_visible(index: number): boolean;
        pages_extended(): $mol_book_page[];
        title(): any;
    }
}
declare var localStorage: Storage;
declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value, force?: $mol_atom_force): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}
declare namespace $ {
    class $mol_file extends $mol_object {
        static absolute(path: string): $mol_file;
        static relative(path: string): $mol_file;
        path(): string;
        watcher(): any;
        stat(next?: any, force?: $mol_atom_force): any;
        version(): any;
        exists(next?: boolean): boolean;
        parent(): $mol_file;
        type(): "file" | "dir" | "blocks" | "chars" | "link" | "fifo" | "socket";
        name(): any;
        ext(): string;
        content(next?: string, force?: $mol_atom_force): any;
        reader(): any;
        writer(): any;
        sub(): $mol_file[];
        resolve(path: string): $mol_file;
        relate(base?: any): any;
        append(next: string): void;
        find(include?: RegExp, exclude?: RegExp): $mol_file[];
    }
}
declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    class $mol_locale extends $mol_object {
        static lang_default(): string;
        static lang(next?: string): string;
        static source(lang: string): any;
        static texts(next?: $mol_locale_dict): $mol_locale_dict;
        static text(contexts: string[], key: string): string;
    }
}
declare namespace $ {
    class $mol_bar extends $mol_view {
    }
}
declare namespace $ {
    class $mol_svg extends $mol_view {
        dom_name(): string;
        dom_name_space(): string;
    }
}
declare namespace $ {
    class $mol_svg_root extends $mol_svg {
        dom_name(): string;
        view_box(): string;
        aspect(): string;
        attr(): {
            "viewBox": string;
            "preserveAspectRatio": string;
        };
    }
}
declare namespace $ {
    class $mol_svg_group extends $mol_svg {
        dom_name(): string;
    }
}
declare namespace $ {
    class $mol_svg_line extends $mol_svg {
        dom_name(): string;
        from(): any[];
        to(): any[];
        pos(): any[];
        from_x(): string;
        from_y(): string;
        to_x(): string;
        to_y(): string;
        attr(): {
            "x1": string;
            "y1": string;
            "x2": string;
            "y2": string;
        };
    }
}
declare namespace $ {
    class $mol_svg_path extends $mol_svg {
        dom_name(): string;
        geometry(): string;
        attr(): {
            "d": string;
        };
    }
}
declare namespace $ {
    class $mol_svg_circle extends $mol_svg {
        dom_name(): string;
        pos(): any[];
        radius(): string;
        pos_x(): string;
        pos_y(): string;
        attr(): {
            "r": string;
            "cx": string;
            "cy": string;
        };
    }
}
declare namespace $ {
    class $mol_svg_text extends $mol_svg {
        dom_name(): string;
        pos(): any[];
        pos_x(): string;
        pos_y(): string;
        align(): string;
        attr(): {
            "x": string;
            "y": string;
            "text-anchor": string;
        };
        text(): string;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_svg_line extends $.$mol_svg_line {
        from(): any;
        from_x(): any;
        from_y(): any;
        to(): any;
        to_x(): any;
        to_y(): any;
    }
    class $mol_svg_circle extends $.$mol_svg_circle {
        pos_x(): any;
        pos_y(): any;
    }
    class $mol_svg_text extends $.$mol_svg_text {
        pos_x(): any;
        pos_y(): any;
    }
}
declare namespace $ {
    class $mol_icon extends $mol_svg_root {
        view_box(): string;
        path(): string;
        Path(): $mol_svg_path;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_icon_cross extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    enum $mol_keyboard_code {
        backspace = 8,
        tab = 9,
        enter = 13,
        shift = 16,
        ctrl = 17,
        alt = 18,
        pause = 19,
        capsLock = 20,
        escape = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        insert = 45,
        delete = 46,
        key0 = 48,
        key1 = 49,
        key2 = 50,
        key3 = 51,
        key4 = 52,
        key5 = 53,
        key6 = 54,
        key7 = 55,
        key8 = 56,
        key9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        metaLeft = 91,
        metaRight = 92,
        select = 93,
        numpad0 = 96,
        numpad1 = 97,
        numpad2 = 98,
        numpad3 = 99,
        numpad4 = 100,
        numpad5 = 101,
        numpad6 = 102,
        numpad7 = 103,
        numpad8 = 104,
        numpad9 = 105,
        multiply = 106,
        add = 107,
        subtract = 109,
        decimal = 110,
        divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        numLock = 144,
        scrollLock = 145,
        semicolon = 186,
        equals = 187,
        comma = 188,
        dash = 189,
        period = 190,
        forwardSlash = 191,
        graveAccent = 192,
        bracketOpen = 219,
        slashBack = 220,
        bracketClose = 221,
        quoteSingle = 222,
    }
}
declare namespace $ {
    class $mol_button extends $mol_view {
        enabled(): boolean;
        event_click(event?: any, force?: $mol_atom_force): any;
        event_activate(event?: any, force?: $mol_atom_force): any;
        evenet_key_press(event?: any, force?: $mol_atom_force): any;
        event(): {
            "click": (event?: any) => any;
            "keypress": (event?: any) => any;
        };
        disabled(): boolean;
        tab_index(): string;
        attr(): {
            "disabled": boolean;
            "role": string;
            "tabindex": string;
        };
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_button extends $.$mol_button {
        disabled(): boolean;
        event_activate(next: Event): void;
        evenet_key_press(event: KeyboardEvent): void;
        tab_index(): string;
    }
}
declare namespace $ {
    class $mol_button_major extends $mol_button {
    }
}
declare namespace $ {
    class $mol_button_minor extends $mol_button {
    }
}
declare namespace $ {
    class $mol_button_danger extends $mol_button {
    }
}
declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static _storage: {
            [key: string]: any;
        };
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}
declare namespace $ {
    class $mol_scroll extends $mol_view {
        minimal_height(): number;
        scroll_top(val?: any, force?: $mol_atom_force): any;
        scroll_left(val?: any, force?: $mol_atom_force): any;
        scroll_bottom(val?: any, force?: $mol_atom_force): any;
        scroll_right(val?: any, force?: $mol_atom_force): any;
        field(): {
            "scrollTop": any;
            "scrollLeft": any;
            "scrollBottom": any;
            "scrollRight": any;
        };
        event_scroll(event?: any, force?: $mol_atom_force): any;
        event_async(): {
            "scroll": (event?: any) => any;
        };
    }
}
declare namespace $ {
    interface $mol_view_context {
        $mol_scroll_scroll_top(): number;
        $mol_scroll_scroll_left(): number;
        $mol_scroll_moving(): boolean;
    }
}
declare namespace $.$mol {
    class $mol_scroll extends $.$mol_scroll {
        scroll_top(next?: number): number;
        scroll_left(next?: number): number;
        scroll_bottom(next?: number): number;
        scroll_right(next?: number): number;
        event_scroll(next?: Event): void;
        event_repos(next?: Event): void;
        _moving_task_frame: number;
        moving_task_stop(): void;
        moving(next?: boolean): boolean;
        context_sub(): $mol_view_context;
    }
}
declare namespace $ {
    class $mol_pop extends $mol_view {
        showed(val?: any, force?: $mol_atom_force): any;
        Anchor(): any;
        align(): string;
        bubble_content(): any[];
        height_max(): number;
        Bubble(): $mol_pop_tip;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_pop_tip extends $mol_scroll {
        content(): any[];
        sub(): any[];
        height_max(): number;
        style(): {
            "maxHeight": number;
        };
        align(): string;
        attr(): {
            "mol_pop_align": string;
        };
    }
}
declare namespace $.$mol {
    class $mol_pop extends $.$mol_pop {
        sub(): any[];
        height_max(): number;
    }
}
declare namespace $ {
    class $mol_dimmer extends $mol_view {
        haystack(): string;
        needle(): string;
        parts(): any[];
        sub(): any[];
        string(id: any): string;
        low(id: any): $mol_dimmer_low;
    }
}
declare namespace $ {
    class $mol_dimmer_low extends $mol_view {
        dom_name(): string;
    }
}
declare namespace $.$mol {
    class $mol_dimmer extends $.$mol_dimmer {
        parts(): any[];
        strings(): string[];
        string(index: number): string;
    }
}
declare namespace $ {
    class $mol_nav extends $mol_view {
        cycle(val?: any, force?: $mol_atom_force): any;
        keys_x(val?: any, force?: $mol_atom_force): any;
        keys_y(val?: any, force?: $mol_atom_force): any;
        current_x(val?: any, force?: $mol_atom_force): any;
        current_y(val?: any, force?: $mol_atom_force): any;
        event_up(event?: any, force?: $mol_atom_force): any;
        event_down(event?: any, force?: $mol_atom_force): any;
        event_left(event?: any, force?: $mol_atom_force): any;
        event_right(event?: any, force?: $mol_atom_force): any;
        event_key(event?: any, force?: $mol_atom_force): any;
        event(): {
            "keydown": (event?: any) => any;
        };
        attr(): {
            "mol_nav_x": any;
            "mol_nav_y": any;
        };
    }
}
declare namespace $.$mol {
    class $mol_nav extends $.$mol_nav {
        dom_node(): Element;
        event_key(event?: KeyboardEvent): void;
        event_up(event?: KeyboardEvent): void;
        event_down(event?: KeyboardEvent): void;
        event_left(event?: KeyboardEvent): void;
        event_right(event?: KeyboardEvent): void;
        index_y(): any;
        index_x(): any;
    }
}
declare namespace $ {
    class $mol_icon_chevron extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_string extends $mol_view {
        dom_name(): string;
        enabled(): boolean;
        disabled(): boolean;
        value(val?: any, force?: $mol_atom_force): any;
        value_changed(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        type(val?: any, force?: $mol_atom_force): any;
        field(): {
            "disabled": boolean;
            "value": any;
            "placeholder": string;
            "type": any;
        };
        event_change(event?: any, force?: $mol_atom_force): any;
        event(): {
            "input": (event?: any) => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_string extends $.$mol_string {
        event_change(next?: Event): void;
        disabled(): boolean;
    }
}
declare namespace $ {
    class $mol_list extends $mol_view {
        style(): {
            "minHeight": number;
        };
        rows(): any[];
        sub(): any[];
        Empty(): any;
    }
}
declare namespace $.$mol {
    class $mol_list extends $.$mol_list {
        sub(): any[];
        row_offsets(): number[];
        row_context(index: number): any;
        sub_visible(): any[];
        minimal_height(): number;
    }
}
declare namespace $ {
    class $mol_select extends $mol_view {
        dictionary(): {};
        options(): any[];
        value(val?: any, force?: $mol_atom_force): any;
        searchable(): boolean;
        search_breakpoint(): number;
        clearable(): boolean;
        event_select(id: any, event?: any, force?: $mol_atom_force): any;
        option_label(id: any): string;
        filter_pattern(val?: any, force?: $mol_atom_force): any;
        Option_label(id: any): $mol_dimmer;
        option_content(id: any): any[];
        option_content_super(id: any): any[];
        Option_row(id: any): $mol_button;
        no_options_message(): string;
        No_options(): $mol_view;
        clear_option_message(): string;
        Clear_icon(): $mol_icon_cross;
        clear_option_content(): any[];
        Сlear_option_content(): $mol_view;
        nav_components(): any[];
        option_focused(key?: any, force?: $mol_atom_force): any;
        nav_cycle(val?: any, force?: $mol_atom_force): any;
        Nav(): $mol_nav;
        plugins(): any[];
        options_showed(val?: any, force?: $mol_atom_force): any;
        options_align(val?: any, force?: $mol_atom_force): any;
        event_showed_toggle(event?: any, force?: $mol_atom_force): any;
        Trigger_icon(): $mol_icon_chevron;
        value_content(): any[];
        trigger_content(): any[];
        Trigger(): $mol_button;
        filter_hint(): string;
        Filter_string(): $mol_string;
        filter_content(): any[];
        option_rows(): any[];
        bubble_content(): any[];
        Bubble_content(): $mol_list;
        Pop(): $mol_pop;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_select extends $.$mol_select {
        filter_pattern(next?: string): string;
        options_showed(val?: boolean): boolean;
        options(): string[];
        options_filtered(): string[];
        option_label(id: string): any;
        option_rows(): $mol_view[] | $.$mol_button[];
        option_content_super(id: string): any[];
        option_focused(component: $mol_view): $mol_view;
        event_showed_toggle(event?: MouseEvent): void;
        event_select(id: string, event?: MouseEvent): void;
        searchable(): boolean;
        nav_components(): any[];
        bubble_content(): any[];
        value_content(): any[];
    }
}
declare namespace $ {
    class $mol_search extends $mol_bar {
        query(val?: any, force?: $mol_atom_force): any;
        suggest_selected(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        suggests_showed(): boolean;
        suggests(): any[];
        Suggest(): $mol_search_suggest;
        Clear_icon(): $mol_icon_cross;
        event_clear(val?: any, force?: $mol_atom_force): any;
        Clear(): $mol_button_minor;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_search_suggest extends $mol_select {
        trigger_content(): any[];
        bubble_content(): any[];
        clearable(): boolean;
    }
}
declare namespace $.$mol {
    class $mol_search extends $.$mol_search {
        suggests_showed(): boolean;
        suggest_selected(next?: string): any;
        sub(): ($mol_button_minor | $mol_search_suggest)[];
        event_clear(event?: Event): void;
    }
}
declare var cordova: any;
declare namespace $ {
    var $mol_cordova: any;
    function $mol_cordova_camera(): any;
}
declare namespace $ {
    class $mol_code extends $mol_view {
        value(val?: any, force?: $mol_atom_force): any;
        format(): string;
        hint(): string;
        Manual(): $mol_search;
        event_scan(val?: any, force?: $mol_atom_force): any;
        scan_label(): string;
        Scan(): $mol_button;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_code extends $.$mol_code {
        scan_support(): boolean;
        Scan(): $.$mol_button;
        event_scan(): void;
    }
}
declare namespace $ {
    class $mol_page extends $mol_view {
        Title(): $mol_view;
        tools(): any[];
        head(): any[];
        Head(): $mol_view;
        body_scroll_top(val?: any, force?: $mol_atom_force): any;
        body(): any[];
        Body(): $mol_scroll;
        foot(): any[];
        Foot(): $mol_view;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_page extends $.$mol_page {
        body_scroll_top(next?: number): number;
    }
}
declare var process: any;
declare namespace $ {
    class $mol_state_arg<Value> extends $mol_object {
        prefix: string;
        static href(next?: string): string;
        static dict(next?: {
            [key: string]: string;
        }): {
            [key: string]: any;
        };
        static value(key: string, next?: string): any;
        static link(next: any): string;
        static make(next: {
            [key: string]: any;
        }): string;
        constructor(prefix?: string);
        value(key: string, next?: string): any;
        sub(postfix: string): $mol_state_arg<{}>;
        link(next: {
            [key: string]: string;
        }): string;
    }
}
declare namespace $ {
    class $mol_link extends $mol_view {
        minimal_height(): number;
        dom_name(): string;
        uri(): string;
        hint(): string;
        target(): string;
        current(): boolean;
        attr(): {
            "href": string;
            "title": string;
            "target": string;
            "mol_link_current": boolean;
        };
        sub(): any[];
        arg(): {};
    }
}
declare namespace $.$mol {
    class $mol_link extends $.$mol_link {
        uri(): string;
        current(): boolean;
    }
}
declare namespace $ {
    class $mol_labeler extends $mol_view {
        dom_name(): string;
        label(): any[];
        Title(): $mol_view;
        content(): any;
        Content(): $mol_view;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_row extends $mol_view {
        style(): {
            "minHeight": number;
        };
    }
}
declare namespace $ {
    class $mol_row_sub extends $mol_view {
    }
}
declare namespace $.$mol {
    class $mol_row extends $.$mol_row {
        item_offsets_top(): number[];
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
        minimal_height(): number;
    }
}
declare namespace $ {
    class $mol_image extends $mol_view {
        dom_name(): string;
        uri(): string;
        field(): {
            "src": string;
            "alt": string;
        };
    }
}
declare namespace $ {
    function $mol_csv_parse(text: string, delimiter?: string): {
        [key: string]: any;
    }[];
}
declare namespace $ {
    class $mol_http_request extends $mol_object {
        uri(): string;
        method_get(): string;
        method_put(): string;
        credentials(): {
            login?: string;
            password?: string;
        };
        headers(): {};
        body(): any;
        'native()': XMLHttpRequest;
        native(): XMLHttpRequest;
        destroyed(next?: boolean): boolean;
        response(next?: any, force?: $mol_atom_force): XMLHttpRequest;
        text(next?: string, force?: $mol_atom_force): string;
    }
}
declare namespace $ {
    class $mol_http_resource extends $mol_object {
        static item(uri: string): $mol_http_resource;
        uri(): string;
        method_get(): string;
        method_put(): string;
        credentials(): {
            login?: string;
            password?: string;
        };
        headers(): {};
        request(): $mol_http_request;
        text(next?: string, force?: $mol_atom_force): string;
    }
}
declare namespace $ {
    class $mol_app_lamps extends $mol_book {
        lamp_current_id(val?: any, force?: $mol_atom_force): any;
        Placeholder(): $mol_book_placeholder;
        filter_hint(): string;
        filter(val?: any, force?: $mol_atom_force): any;
        Filter(): $mol_code;
        menu_scroll_top(val?: any, force?: $mol_atom_force): any;
        lamp_rows(): any[];
        Menu(): $mol_list;
        Addon_page(): $mol_page;
        title(): string;
        Close_icon(): $mol_icon_cross;
        Close(): $mol_link;
        Temp_title(): string;
        temp(): string;
        Temp(): $mol_labeler;
        cri_title(): string;
        cri(): string;
        Cri(): $mol_labeler;
        angle_title(): string;
        angle(): string;
        Angle(): $mol_labeler;
        Light(): $mol_row;
        type_title(): string;
        type(): string;
        Type(): $mol_labeler;
        shape_title(): string;
        shape(): string;
        Shape(): $mol_labeler;
        base_title(): string;
        base(): string;
        Base(): $mol_labeler;
        Body(): $mol_row;
        Info(): $mol_row;
        photo(): string;
        Photo(): $mol_image;
        Gallery(): $mol_row;
        Main_page(): $mol_page;
        pages(): any[];
        lamp_title(id: any): string;
        lamp_arg(id: any): {};
        Lamp_row(id: any): $mol_lamps_lamp_row;
    }
}
declare namespace $ {
    class $mol_lamps_lamp_row extends $mol_link {
        minimal_height(): number;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_lamps extends $.$mol_app_lamps {
        lamps_all(): {
            [key: string]: any;
        }[];
        lamps(): {
            [key: string]: any;
        }[];
        lamps_dict(): {
            [key: string]: any;
        };
        lamp_rows(): $mol_lamps_lamp_row[];
        lamp_title(id: string): any;
        filter(next?: string): any;
        lamp_arg(id: string): {
            'lamp': string;
        };
        id(next?: string): any;
        lamp(): any;
        pages(): $mol_view[];
        menu_scroll_top(next?: number): number;
        title(): any;
        cri(): string;
        angle(): string;
        shape(): string;
        base(): string;
        type(): string;
        temp(): string;
        matt(): boolean;
        slug(id: string): any;
        photo(): string;
        thumb(id: string): string;
    }
}
declare namespace $ {
    class $mol_app_lamps_demo extends $mol_app_lamps {
        title(): string;
    }
}
