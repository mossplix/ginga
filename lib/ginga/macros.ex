
defmodule  Ginga.Macros do


defmacro left && right do
  quote do
    case unquote(left) do
      false -> false
      _ -> unquote(right)
    end
  end
end

end
